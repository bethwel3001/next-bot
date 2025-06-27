export async function askAI(prompt) {
  const res = await fetch('/api/ask', {
    
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  const { answer } = await res.json();
  return answer;
}
