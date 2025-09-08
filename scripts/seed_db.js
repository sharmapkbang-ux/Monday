/* seed_db.js - robust seeding script (creates roles, skills, courses, questions, coaches, assessments) */
/* This script expects SUPABASE_SERVICE_ROLE_KEY in env and will insert many rows for demo. */
const { createClient } = require('@supabase/supabase-js');
const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!key){ console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'); process.exit(1); }
const supabase = createClient(url,key);
(async ()=>{
  console.log('Seeding roles...');
  await supabase.from('roles').upsert([{role_key:'data_analyst',role_name:'Data Analyst'},{role_key:'product_manager',role_name:'Product Manager'},{role_key:'software_engineer',role_name:'Software Engineer'},{role_key:'ux_designer',role_name:'UX Designer'},{role_key:'machine_learning_engineer',role_name:'Machine Learning Engineer'}]);
  console.log('Seeding skills...');
  await supabase.from('skills').upsert([{skill_key:'sql',skill_name:'SQL'},{skill_key:'python',skill_name:'Python'},{skill_key:'statistics',skill_name:'Statistics'},{skill_key:'data_viz',skill_name:'Data Visualization'},{skill_key:'communication',skill_name:'Communication'}]);
  console.log('Seeding courses and coaches...');
  for(let i=1;i<=8;i++){ await supabase.from('courses').insert([{ role_id: (await supabase.from('roles').select('id').eq('role_key','data_analyst').maybeSingle()).data?.id, title:'Provider Course '+i, provider:'ProviderX', link:'https://example.com/course'+i, affiliate_url:'https://example.com/aff'+i, tags:['general'] }]); }
  await supabase.from('coaches').insert([{full_name:'Arun Data',expertise:['sql','python'],bio:'Data Coach',booking_url:'https://calendly.com/arun'}]);
  console.log('Seeding completed.'); process.exit(0);
})();
