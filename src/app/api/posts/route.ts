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
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as PostingCategory | null;
    
    const client = await clientPromise;
    const db = client.db('cruzconnect');
    
    // If category is provided, filter by it
    const query = category ? { category } : {};
    const posts = await db.collection('posts').find(query).sort({ dateCreated: -1 }).toArray();
    
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, description, contact } = body;
    
    // Basic validation
    if (!title || !category || !description) {
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
    const db = client.db('cruzconnect');
    const result = await db.collection('posts').insertOne(newPost);
    
    return NextResponse.json({ 
      success: true, 
      data: { ...newPost, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 