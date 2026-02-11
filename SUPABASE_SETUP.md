# Supabase Setup for Bold Kosova

## Step 1: Create the Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. **Name:** bold-kosova
4. **Region:** EU (Frankfurt) - eu-central-1
5. **Database Password:** Use a strong password (save it!)
6. Wait for the project to be created (~2 minutes)

## Step 2: Run the Migration

1. Go to **SQL Editor** in the Supabase dashboard
2. Copy the contents of `supabase/migration.sql` and run it
3. This creates all tables, indexes, RLS policies, and triggers

## Step 3: Seed the Database

1. In **SQL Editor**, copy the contents of `supabase/seed.sql` and run it
2. This inserts all 38 products with their variants and specs
3. It also creates storage buckets with proper policies

## Step 4: Create Admin User

1. Go to **Authentication** > **Users** in the dashboard
2. Click "Add User" > "Create New User"
3. **Email:** rona@bold-ks.com
4. **Password:** BoldAdmin2026!
5. Check "Auto Confirm User"

## Step 5: Get API Keys

1. Go to **Settings** > **API** in the dashboard
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role secret** key

## Step 6: Update Environment Variables

### Local development:
Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Vercel production:
```powershell
$token = "<YOUR_VERCEL_TOKEN>"

# Remove placeholders first
vercel env rm NEXT_PUBLIC_SUPABASE_URL production --yes --token $token
vercel env rm NEXT_PUBLIC_SUPABASE_ANON_KEY production --yes --token $token
vercel env rm SUPABASE_SERVICE_ROLE_KEY production --yes --token $token

# Add real values
echo "https://xxxxx.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production --token $token
echo "your-anon-key" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --token $token
echo "your-service-role-key" | vercel env add SUPABASE_SERVICE_ROLE_KEY production --token $token
```

## Step 7: Redeploy
```powershell
vercel --prod --yes --token <YOUR_VERCEL_TOKEN>
```

## Step 8: Test
1. Visit https://bold-plum.vercel.app/admin/login
2. Login with rona@bold-ks.com / BoldAdmin2026!
3. You should see the admin dashboard
