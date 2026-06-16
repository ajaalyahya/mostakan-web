import { useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const staticCategories = [
  { name: "شاي مثلج",  imageUrl: "", branch: "main" },
  { name: "شاي ساخن",  imageUrl: "", branch: "main" },
  { name: "مأكولات",   imageUrl: "", branch: "main" },
  { name: "شاي مختص",  imageUrl: "", branch: "main" },
];

const staticProducts = [
  { name: "شاي الكركديه المثلج", desc: "شاي كركديه بارد ومنعش",                              price: 19, cal: 81,  img: "", category: "شاي مثلج", branch: "main" },
  { name: "شاي الخوخ المثلج",    desc: "شاي خوخ بارد ومنعش",                                price: 19, cal: 75,  img: "", category: "شاي مثلج", branch: "main" },
  { name: "شاي الليمون المثلج",  desc: "شاي ليمون بارد ومنعش",                              price: 19, cal: 89,  img: "", category: "شاي مثلج", branch: "main" },
  { name: "ماتشا لاتيه",         desc: "مذاق الماتشا الأصلي",                               price: 22, cal: 150, img: "", category: "شاي مثلج", branch: "main" },
  { name: "الشاي الأبيض",        desc: "شاي أبيض عضوي",                                    price: 12, cal: 2,   img: "", category: "شاي مختص", branch: "main" },
  { name: "الشاي الأخضر",        desc: "شاي أخضر عضوي",                                    price: 12, cal: 1,   img: "", category: "شاي مختص", branch: "main" },
  { name: "قوري شاي",            desc: "شاي خادر يقدم بقوري",                              price: 29, cal: 5,   img: "", category: "شاي ساخن", branch: "main" },
  { name: "شاي",                 desc: "شاي خادر بنكهته الأصيلة",                          price: "6 / 8 / 10", cal: 1, img: "", category: "شاي ساخن", branch: "main" },
  { name: "كرك",                 desc: "كرك غني بنكهته الأصلية",                           price: "10 / 12", cal: 250, img: "", category: "شاي ساخن", branch: "main" },
  { name: "تارت اللوز",          desc: "تارت اللوز بلمسة متقنة ونكهة متوازنة",             price: 18, cal: 400, img: "", category: "مأكولات", branch: "main" },
  { name: "براونيز",             desc: "شوكلاتة بطعمها الفريد",                            price: 17, cal: 320, img: "", category: "مأكولات", branch: "main" },
  { name: "سكونز",               desc: "بسكوت بريطاني بالجبن والمربى",                     price: 14, cal: 230, img: "", category: "مأكولات", branch: "main" },
  { name: "سينامون بايتس",       desc: "سينامون طري يُحضَّر بإتقان ليكمل لحظاتكم المميزة", price: 25, cal: 460, img: "", category: "مأكولات", branch: "main" },
  { name: "مخبوزات",             desc: "زعتر، لبنة، لبنة زعتر، لبنة عسل، جبن",            price: 9,  cal: 350, img: "", category: "مأكولات", branch: "main" },
  { name: "كيكة الزعتر",         desc: "كيكة زعتر بحشوة الجبن",                            price: 9,  cal: 140, img: "", category: "مأكولات", branch: "main" },
  { name: "مكسرات",              desc: "مكسرات مشكلة",                                     price: 8,  cal: 160, img: "", category: "مأكولات", branch: "main" },
];

export default function MigrateData() {
  const [status, setStatus]       = useState("");
  const [loading, setLoading]     = useState(false);
  const [done, setDone]           = useState(false);
  const [loadingBranch, setLoadingBranch] = useState(false);
  const [doneBranch, setDoneBranch]       = useState(false);

  // ── رفع كل البيانات (الأصلي) ──
  const handleMigrate = async () => {
    if (!window.confirm("رفع كل البيانات لـ Firestore؟")) return;
    setLoading(true);
    setStatus("جاري الرفع...");
    try {
      const oldCats = await getDocs(collection(db, "categories"));
      for (const d of oldCats.docs) await deleteDoc(doc(db, "categories", d.id));
      const oldProds = await getDocs(collection(db, "products"));
      for (const d of oldProds.docs) await deleteDoc(doc(db, "products", d.id));

      setStatus("جاري رفع الأصناف...");
      for (const cat of staticCategories) await addDoc(collection(db, "categories"), cat);

      setStatus("جاري رفع المنتجات...");
      for (const prod of staticProducts) await addDoc(collection(db, "products"), prod);

      setStatus("✅ تم رفع كل البيانات بنجاح!");
      setDone(true);
    } catch (e) {
      setStatus("❌ صار خطأ: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  // ── إضافة branch: "main" للبيانات الحالية ──
  const handleAddBranch = async () => {
    if (!window.confirm('إضافة branch: "main" لكل البيانات الحالية؟')) return;
    setLoadingBranch(true);
    setStatus("جاري تحديث الأصناف...");
    try {
      const catsSnap = await getDocs(collection(db, "categories"));
      for (const d of catsSnap.docs) {
        if (!d.data().branch) {
          await updateDoc(doc(db, "categories", d.id), { branch: "main" });
        }
      }

      setStatus("جاري تحديث المنتجات...");
      const prodsSnap = await getDocs(collection(db, "products"));
      for (const d of prodsSnap.docs) {
        if (!d.data().branch) {
          await updateDoc(doc(db, "products", d.id), { branch: "main" });
        }
      }

      setStatus("✅ تم إضافة branch لكل البيانات!");
      setDoneBranch(true);
    } catch (e) {
      setStatus("❌ صار خطأ: " + e.message);
    } finally {
      setLoadingBranch(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 24,
      background: "#080810", color: "#f0eee8", fontFamily: "sans-serif",
      padding: 20, textAlign: "center"
    }}>
      <div style={{ fontSize: 48 }}>🚀</div>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>أدوات قاعدة البيانات</h1>

      {/* ── زر رفع البيانات الأصلي ── */}
      <div style={{ background: "#16162a", borderRadius: 16, padding: 24, maxWidth: 400, width: "100%", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>📦</div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>رفع البيانات الأصلية</h2>
        <p style={{ color: "#9896a0", fontSize: 14, marginBottom: 16 }}>
          يحذف كل البيانات الحالية ويرفع البيانات الثابتة من جديد.
          استخدمه مرة وحدة فقط.
        </p>
        {!done && (
          <button onClick={handleMigrate} disabled={loading} style={btnStyle("#e8c060", "#080810", loading)}>
            {loading ? "جاري الرفع..." : "ارفع البيانات ←"}
          </button>
        )}
        {done && <p style={{ color: "#e8c060", fontSize: 14 }}>✅ تم بنجاح!</p>}
      </div>

      {/* ── زر إضافة branch ── */}
      <div style={{ background: "#16162a", borderRadius: 16, padding: 24, maxWidth: 400, width: "100%", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🏷</div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>تحديث البيانات الحالية</h2>
        <p style={{ color: "#9896a0", fontSize: 14, marginBottom: 16 }}>
          يضيف حقل <code style={{ background: "#222", padding: "1px 6px", borderRadius: 4 }}>branch: "main"</code> لكل المنتجات والأصناف الحالية تلقائياً.
          آمن تماماً ولا يمسح أي بيانات.
        </p>
        {!doneBranch && (
          <button onClick={handleAddBranch} disabled={loadingBranch} style={btnStyle("#243C2C", "#F3E7D9", loadingBranch)}>
            {loadingBranch ? "جاري التحديث..." : "أضف branch للبيانات ←"}
          </button>
        )}
        {doneBranch && <p style={{ color: "#7ec897", fontSize: 14 }}>✅ تم تحديث كل البيانات!</p>}
      </div>

      {/* Status */}
      {status && (
        <div style={{ padding: "12px 24px", background: "#16162a", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", fontSize: 15 }}>
          {status}
        </div>
      )}
    </div>
  );
}

const btnStyle = (bg, color, disabled) => ({
  padding: "12px 28px", background: bg, color,
  border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
  cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1,
  width: "100%",
});