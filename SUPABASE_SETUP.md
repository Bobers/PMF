# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Save your project URL and anon key

## 2. Set up Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Run Database Schema

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the sidebar
3. Create a new query
4. Copy and paste the contents of `supabase-schema.sql`
5. Run the query

## 4. Enable Email Authentication

1. Go to Authentication → Providers
2. Enable Email provider
3. Configure email templates if needed

## 5. (Optional) Configure Email Settings

For production:
1. Go to Authentication → Email Templates
2. Customize confirmation emails
3. Set up a custom SMTP provider for better deliverability

## Features Implemented

- **User Authentication**: Sign up, sign in, sign out
- **Data Persistence**: Automatically saves project data
- **Multi-Project Support**: Users can have multiple projects
- **Version Control**: Separate data storage for V2 and V3
- **Data Export**: Export all user data as JSON
- **Row Level Security**: Users can only access their own data

## Usage

1. Users sign up/sign in
2. Create or load a project through the Product onboarding
3. Data is automatically saved as they work
4. Can switch between V2 and V3 versions
5. Can export their data anytime