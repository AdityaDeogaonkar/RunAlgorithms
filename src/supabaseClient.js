import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xqfermxgkxjavxclyrxq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZmVybXhna3hqYXZ4Y2x5cnhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1Mjk0OTksImV4cCI6MjA4NjEwNTQ5OX0.z_zvU3d6Y2n5vdM8hS0btgQGS7CR9mnASH9xzjyBWlk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
