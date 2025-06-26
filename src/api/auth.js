const BASE_URL = "http://20.244.56.144/evaluation-service";

export async function registerUser() {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "your.email@domain.com",
      name: "Your Name",
      mobileNo: "9876543210",
      githubUsername: "yourgithub",
      rollNo: "yourroll",
      accessCode: "YtvpyJ"
    }),
  });

  const data = await res.json();
  console.log("Registered:", data);
  return data;
}

const BASE = "/evaluation-service"; 

export async function getToken(clientID, clientSecret) {
  const res = await fetch(`${BASE}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "your@email.com",
      name: "Your Name",
      rollNo: "yourroll",
      accessCode: "YtvpyJ",
      clientID,
      clientSecret,
    }),
  });

  const data = await res.json();
  return data.access_token;
}
