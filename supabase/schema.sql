
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.cart_sessions CASCADE;
DROP TABLE IF EXISTS public.articles CASCADE;
DROP TABLE IF EXISTS public.ingredients CASCADE;
DROP TABLE IF EXISTS public.skin_concerns CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.faq CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.collections CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    email TEXT,
    whatsapp_number TEXT,
    role TEXT DEFAULT 'customer'::text CHECK (role IN ('customer', 'admin')),
    shipping_address JSONB
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for Profiles
CREATE POLICY "Users can read own profile" 
    ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admin can access all profiles" 
    ON public.profiles FOR ALL USING (
        auth.jwt() ->> 'role' = 'service_role' OR 
        (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
    );


-- Automatic Profile Creation from auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();




-- Create Collections Table
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    "order" INTEGER DEFAULT 0 NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

-- Policies for Collections
CREATE POLICY "Allow public read access to collections" 
    ON public.collections FOR SELECT USING (true);

CREATE POLICY "Allow admin write access to collections" 
    ON public.collections FOR ALL USING (
        auth.jwt() ->> 'role' = 'service_role' OR 
        (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
    );


-- Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price NUMERIC NOT NULL,
    compare_at_price NUMERIC,
    category TEXT NOT NULL,
    in_stock BOOLEAN DEFAULT true NOT NULL,
    inventory_count INTEGER DEFAULT 0 NOT NULL,
    image_urls TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    priority INTEGER DEFAULT 0 NOT NULL, -- Higher = shown first (e.g. Apparel > Snacks)
    collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policies for Products
CREATE POLICY "Allow public read access to products" 
    ON public.products FOR SELECT USING (true);

CREATE POLICY "Allow admin write access to products" 
    ON public.products FOR ALL USING (
        auth.jwt() ->> 'role' = 'service_role' OR 
        (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
    );


-- Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pending'::text NOT NULL CHECK (status IN ('pending', 'paid', 'shipped', 'cancelled')),
    total_amount NUMERIC NOT NULL,
    payment_method TEXT NOT NULL, -- 'manual_payment', 'apple_pay'
    payment_status TEXT DEFAULT 'pending'::text NOT NULL CHECK (payment_status IN ('pending', 'completed', 'failed')),
    shipping_address JSONB NOT NULL,
    items JSONB NOT NULL,
    whatsapp_number TEXT,
    email TEXT,
    payment_details JSONB
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policies for Orders
CREATE POLICY "Users can read own orders" 
    ON public.orders FOR SELECT USING (auth.uid() = customer_id OR email = auth.email());

CREATE POLICY "Users can insert own orders" 
    ON public.orders FOR INSERT WITH CHECK (true); -- Allow guest checkout inserts

CREATE POLICY "Admin can manage all orders" 
    ON public.orders FOR ALL USING (
        auth.jwt() ->> 'role' = 'service_role' OR 
        (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
    );


-- Create Cart Sessions (For Abandoned Cart CRM tracking)
CREATE TABLE IF NOT EXISTS public.cart_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    email TEXT,
    whatsapp_number TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_recovered BOOLEAN DEFAULT false NOT NULL
);

-- Enable RLS
ALTER TABLE public.cart_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for Cart Sessions
CREATE POLICY "Allow public inserts to cart sessions" 
    ON public.cart_sessions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public updates to cart sessions" 
    ON public.cart_sessions FOR UPDATE USING (true);

CREATE POLICY "Admin can manage all cart sessions" 
    ON public.cart_sessions FOR ALL USING (
        auth.jwt() ->> 'role' = 'service_role' OR 
        (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
    );

-- Create Articles Table (For Ceuticals Journal)
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    content TEXT,
    image_url TEXT,
    size TEXT DEFAULT 'small'::text CHECK (size IN ('small', 'medium', 'large')),
    is_published BOOLEAN DEFAULT true NOT NULL
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Policies for Articles
CREATE POLICY "Allow public read access to articles" 
    ON public.articles FOR SELECT USING (is_published = true);

CREATE POLICY "Allow admin write access to articles" 
    ON public.articles FOR ALL USING (
        auth.jwt() ->> 'role' = 'service_role' OR 
        (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
    );

-- Create Ingredients Table
CREATE TABLE IF NOT EXISTS public.ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    clinical_description TEXT,
    benefits TEXT,
    image_url TEXT
);
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to ingredients" ON public.ingredients FOR SELECT USING (true);
CREATE POLICY "Allow admin write access to ingredients" ON public.ingredients FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')));

-- Create Skin Concerns Table
CREATE TABLE IF NOT EXISTS public.skin_concerns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    recommended_products UUID[]
);
ALTER TABLE public.skin_concerns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to skin_concerns" ON public.skin_concerns FOR SELECT USING (true);
CREATE POLICY "Allow admin write access to skin_concerns" ON public.skin_concerns FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')));

-- Create Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text_content TEXT,
    is_verified BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to approved reviews" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Allow public insert to reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin write access to reviews" ON public.reviews FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')));

-- Create FAQ Table
CREATE TABLE IF NOT EXISTS public.faq (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'general'::text,
    "order" INTEGER DEFAULT 0
);
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to faq" ON public.faq FOR SELECT USING (true);
CREATE POLICY "Allow admin write access to faq" ON public.faq FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')));

