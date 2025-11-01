-- Drop the overly permissive policy that allows public access to all profile data
DROP POLICY "Profiles are viewable by everyone" ON public.profiles;

-- Create a secure policy that restricts profile access to the owner only
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);