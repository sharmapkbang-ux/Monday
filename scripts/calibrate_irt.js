/* calibrate_irt.js - final calibration job */
const { createClient } = require('@supabase/supabase-js');
const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!key){ console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'); process.exit(1); }
const supabase = createClient(url,key);
(async ()=>{
  console.log('Calibrating IRT parameters...');
  const { data: qs } = await supabase.from('quiz_questions').select('*');
  for(const q of qs || []){
    const { data: items } = await supabase.from('assessment_items').select('is_correct').eq('question_id', q.id);
    const total = (items || []).length || 1;
    const correct = (items || []).filter(i => i.is_correct).length;
    let p = correct/total; p = Math.max(0.01, Math.min(0.99, p));
    const b_new = -Math.log((1-p)/p);
    await supabase.from('quiz_questions').update({ b_param: b_new }).eq('id', q.id);
    console.log('updated', q.id, b_new);
  }
  console.log('Done');
  process.exit(0);
})();
