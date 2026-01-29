const API_BASE_URL = "http://localhost:5000/api";


// FRONTEND – AUTH API FUNCTIONS( RegisterUser and login)

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

// FRONTEND – AUTH API FUNCTIONS( getDeals and claimDeals)

export async function getDeals(token?: string) {
  const res = await fetch(`${API_BASE_URL}/deals`, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  if (!res.ok) {
    throw new Error("Failed to fetch deals");
  }

  return res.json();
}

export async function getDealById(id: string, token?: string) {
  const res = await fetch(`${API_BASE_URL}/deals/${id}`, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  if (!res.ok) {
    throw new Error("Failed to fetch deal");
  }

  return res.json();
}

export async function claimDeal(dealId: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/claims`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ dealId }),
  });

  if (!res.ok) {
    throw new Error("Failed to claim deal");
  }

  return res.json();
}
