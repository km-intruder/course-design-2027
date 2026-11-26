(async function(){"use strict";var E=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
var el=document.getElementById("guide");var id=document.body.dataset.course;
try{const r=await fetch("../courses/"+id+".json");if(!r.ok)throw Error("HTTP "+r.status);const c=await r.json();
const sections=[
["1. 교수설계가이드 개요",c.development_purpose],
["2. 교과목 개요",c.course_description+" / "+c.credits+"학점 / 담당 예상 "+c.professor_name+" / "+c.course_type],
["3. AI·DX 기반 교육의 이해",c.ai_dx_understanding],
["4. AI·DX 교과목 수업 설계",c.integration_summary],
["5. AI·DX 활용 학습 환경",c.digital_tools.map(x=>x.name+": "+x.description).join(" · ")],
["6. 주차별 수업 운영 계획",null],
["7. AI 활용 교수학습활동 설계",c.smart_methods.map(x=>x.method_name+" — "+x.description).join(" / ")],
["8. 학습평가 및 환류 계획 설계","평가비율(제안·미확정): 출석 "+c.attendance_rate+"%, 중간 "+c.midterm_rate+"%, 기말 "+c.final_rate+"%, 과제 "+c.assignment_rate+"%"],
["9. 교수자 수업 운영 가이드","실습 환경 점검 → 사례 설명 → 실습·문제해결 → 피드백 → 수행 검증"],
["10. AI 활용 수업 유의사항",c.ethics_warning],
["11. 참고자료 및 부록","2027학년도 교육과정 11/26(2) 개발안 기준 자동 작성 초안. 담당교수 검토 전 공식 강의계획이 아님."]
];
const table='<table><thead><tr><th>주차</th><th>학습주제</th><th>학습목표</th><th>수업활동</th><th>평가·산출물</th></tr></thead><tbody>'+c.weeks.map(w=>'<tr><td>'+w.weekNum+'</td><td>'+E(w.topic)+'</td><td>'+E(w.goal)+'</td><td>'+E(w.content)+'</td><td>'+E(w.assessment)+'</td></tr>').join("")+'</tbody></table>';
el.innerHTML='<h1>'+E(c.course_name)+' 교수설계가이드</h1><p class="notice">2027학년도 교수협의용 초안입니다. 평가 및 교수진 배정은 담당교수 협의 후 확정합니다.</p>'+sections.map((x,i)=>'<section><h2>'+E(x[0])+'</h2>'+(i===5?table:'<p>'+E(x[1])+'</p>')+'</section>').join("");
document.title=c.course_name+" · 교수설계가이드";
}catch(e){el.innerHTML='<h1>교수설계가이드를 불러오지 못했습니다</h1><p>'+E(e.message)+'</p>'}})();