/* seed_auth_users.js - create demo auth users via Supabase Admin API */
const { createClient } = require('@supabase/supabase-js');
const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!key){ console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'); process.exit(1); }
const supabase = createClient(url,key);
(async ()=>{
  const users = [
    {id:'11111111-1111-1111-1111-111111111111', email:'learner@demo.com', password:'Demo123!', full_name:'Demo Learner', actor:'learner'},
    {id:'22222222-2222-2222-2222-222222222222', email:'coach@demo.com', password:'Demo123!', full_name:'Demo Coach', actor:'coach'},
    {id:'33333333-3333-3333-3333-333333333333', email:'provider@demo.com', password:'Demo123!', full_name:'Demo Provider', actor:'provider'},
    {id:'44444444-4444-4444-4444-444444444444', email:'hiring@demo.com', password:'Demo123!', full_name:'Demo Hiring', actor:'hiring_partner'},
    {id:'55555555-5555-5555-5555-555555555555', email:'evaluator@demo.com', password:'Demo123!', full_name:'Demo Evaluator', actor:'evaluator'},
    {id:'66666666-6666-6666-6666-666666666666', email:'manager@demo.com', password:'Demo123!', full_name:'Demo Manager', actor:'manager'},
    {id:'77777777-7777-7777-7777-777777777777', email:'admin@demo.com', password:'Demo123!', full_name:'Demo Admin', actor:'admin'}
  ];
  for(const u of users){
    try{
      await supabase.auth.admin.createUser({ id: u.id, email: u.email, password: u.password, email_confirm: true });
      await supabase.from('profiles').upsert({ id: u.id, full_name: u.full_name, actor_type: u.actor });
      console.log('created', u.email);
    }catch(e){ console.error('err', e.message || e); }
  }
  process.exit(0);
})();
