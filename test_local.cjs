const reqBody2 = {
  messages: [{role: "user", content: "Hello"}],
  projectContext: "Context", visitorMemory: { visitCount: 1 }
};
fetch('http://localhost:3000/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(reqBody2) })
  .then(res => res.text())
  .then(console.log);
