import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, message } = req.body;
    const { data, error } = await supabase
      .from('messages')
      .insert([{ username, message }]);
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    return res.status(200).json({ status: 'success', data });
    
  } else if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('messages')
      .select('username, message, timestamp')
      .order('timestamp', { ascending: true })
      .limit(50);
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    return res.status(200).json(data);
    
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
