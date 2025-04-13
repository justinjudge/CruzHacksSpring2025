import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { PostingCategory } from '@/app/context/PostingContext';
import { ObjectId } from 'mongodb';

export interface Post {
  _id?: ObjectId;
  title: string;
  category: PostingCategory;
  description: string;
  contact: string;
  dateCreated: Date;
}

export async function GET(request: Request) {
  console.log('📡 [GET] /api/posts route hit');

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as PostingCategory | null;
    console.log(`🔎 Querying posts${category ? ` with category: ${category}` : ''}`);

    const client = await clientPromise;
    console.log('✅ Connected to MongoDB (GET)');

    const db = client.db('cruzconnect');
    const query = category ? { category } : {};

    const posts = await db.collection('posts').find(query).sort({ dateCreated: -1 }).toArray();
    console.log(`📦 Retrieved ${posts.length} post(s)`);

    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error('❌ [GET] Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  console.log('📡 [POST] /api/posts route hit');

  try {
    const body = await request.json();
    const { title, category, description, contact } = body;
    console.log('📥 New post data received:', body);

    if (!title || !category || !description) {
      console.warn('⚠️ Missing required fields in request body');
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newPost: Post = {
      title,
      category,
      description,
      contact: contact || '',
      dateCreated: new Date(),
    };

    const client = await clientPromise;
    console.log('✅ Connected to MongoDB (POST)');

    const db = client.db('cruzconnect');
    const result = await db.collection('posts').insertOne(newPost);

    console.log(`✅ Inserted new post with _id: ${result.insertedId}`);

    return NextResponse.json({ 
      success: true, 
      data: { ...newPost, _id: result.insertedId }
    });
  } catch (error) {
    console.error('❌ [POST] Error creating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
