// ============================================================
// GULTUVAK — Supabase ulanish
// Barcha sahifalarda shu faylni <script> orqali ulang
// (supabase-js CDN'dan KEYIN ulanishi kerak)
// ============================================================

const SUPABASE_URL = "https://pbajzrkgevogyqrltdte.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiYWp6cmtnZXZvZ3lxcmx0ZHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MTc5NTIsImV4cCI6MjEwMTM5Mzk1Mn0.uLr52jO-BTZL7XQ-H-pX2bOHxvTGO70MGnO2FJ2Da8E";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------- Umumiy yordamchi funksiyalar ----------

// Joriy sessiyani olish, agar yo'q bo'lsa null qaytaradi
async function getCurrentUser() {
  const { data: { session } } = await sb.auth.getSession();
  return session ? session.user : null;
}

// Foydalanuvchi profilini olish
async function getProfile(userId) {
  const { data, error } = await sb.from("profiles").select("*").eq("id", userId).single();
  if (error) return null;
  return data;
}

// Sahifani himoyalash: login bo'lmasa auth.html ga yo'naltiradi
async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = "auth.html";
    return null;
  }
  return user;
}

// Chiqish
async function logout() {
  await sb.auth.signOut();
  window.location.href = "index.html";
}

// Sanadan bugungacha necha kun o'tganini hisoblash
function daysSince(dateStr) {
  const then = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - then) / (1000 * 60 * 60 * 24));
  return diff;
}

// Mobil menyu ochish/yopish (barcha sahifalarda umumiy)
function initMobileNav() {
  const btn = document.querySelector(".nav-burger");
  const menu = document.querySelector(".nav-links");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("open");
      btn.classList.toggle("open");
    });
  }
}

document.addEventListener("DOMContentLoaded", initMobileNav);
