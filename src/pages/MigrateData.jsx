import { useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

const staticCategories = [
  { name: "شاي مثلج",  imageUrl: "" },
  { name: "شاي ساخن",  imageUrl: "" },
  { name: "مأكولات",   imageUrl: "" },
  { name: "شاي مختص",  imageUrl: "" },
];

const staticProducts = [
  { name: "شاي الكركديه المثلج", desc: "شاي كركديه بارد ومنعش",                              price: 19, cal: 81,  img: "", category: "شاي مثلج" },
  { name: "شاي الخوخ المثلج",    desc: "شاي خوخ بارد ومنعش",                                price: 19, cal: 75,  img: "", category: "شاي مثلج" },
  { name: "شاي الليمون المثلج",  desc: "شاي ليمون بارد ومنعش",                              price: 19, cal: 89,  img: "", category: "شاي مثلج" },
  { name: "ماتشا لاتيه",         desc: "مذاق الماتشا الأصلي",                               price: 22, cal: 150, img: "", category: "شاي مثلج" },
  { name: "الشاي الأبيض",        desc: "شاي أبيض عضوي",                                    price: 12, cal: 2,   img: "", category: "شاي مختص" },
  { name: "الشاي الأخضر",        desc: "شاي أخضر عضوي",                                    price: 12, cal: 1,   img: "", category: "شاي مختص" },
  { name: "قوري شاي",            desc: "شاي خادر يقدم بقوري",                              price: 29, cal: 5,   img: "", category: "شاي ساخن" },
  { name: "شاي",                 desc: "شاي خادر بنكهته الأصيلة",                          price: "6 / 8 / 10", cal: 1, img: "", category: "شاي ساخن" },
  { name: "كرك",                 desc: "كرك غني بنكهته الأصلية",                           price: "10 / 12", cal: 250, img: "", category: "شاي ساخن" },
  { name: "تارت اللوز",          desc: "تارت اللوز بلمسة متقنة ونكهة متوازنة",             price: 18, cal: 400, img: "", category: "مأكولات" },
  { name: "براونيز",             desc: "شوكلاتة بطعمها الفريد",                            price: 17, cal: 320, img: "", category: "مأكولات" },
  { name: "سكونز",               desc: "بسكوت بريطاني بالجبن والمربى",                     price: 14, cal: 230, img: "", category: "مأكولات" },
  { name: "سينامون بايتس",       desc: "سينامون طري يُحضَّر بإتقان ليكمل لحظاتكم المميزة", price: 25, cal: 460, img: "", category: "مأكولات" },
  { name: "مخبوزات",             desc: "زعتر، لبنة، لبنة زعتر، لبنة عسل، جبن",            price: 9,  cal: 350, img: "", category: "مأكولات" },
  { name: "كيكة الزعتر",         desc: "كيكة زعتر بحشوة الجبن",                            price: 9,  cal: 140, img: "", category: "مأكولات" },
  { name: "مكسرات",              desc: "مكسرات مشكلة",                                     price: 8,  cal: 160, img: "", category: "مأكولات" },
];

export default function MigrateData() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleMigrate = async () => {
    if (!window.confirm("رفع كل البيانات لـ Firestore؟")) return;
    setLoading(true);
    setStatus("جاري الرفع...");

    try {
      // حذف القديم أولاً عشان ما يتكرر
      const oldCats = await getDocs(collection(db, "categories"));
      for (const d of oldCats.docs) await deleteDoc(doc(db, "categories", d.id));

      const oldProds = await getDocs(collection(db, "products"));
      for (const d of oldProds.docs) await deleteDoc(doc(db, "products", d.id));

      setStatus("جاري رفع الأصناف...");
      for (const cat of staticCategories) {
        await addDoc(collection(db, "categories"), cat);
      }

      setStatus("جاري رفع المنتجات...");
      for (const prod of staticProducts) {
        await addDoc(collection(db, "products"), prod);
      }

      setStatus("✅ تم رفع كل البيانات بنجاح!");
      setDone(true);
    } catch (e) {
      setStatus("❌ صار خطأ: " + e.message);
      console.error(e);
    } finally {
      setLoading(false);
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
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>رفع البيانات لـ Firestore</h1>
      <p style={{ color: "#9896a0", maxWidth: 400 }}>
        اضغط الزر مرة وحدة فقط — سيتم رفع كل الأصناف والمنتجات تلقائياً.
        بعدها تقدر تعدل عليهم من الداشبورد وتضيف الصور.
      </p>

      {!done && (
        <button
          onClick={handleMigrate}
          disabled={loading}
          style={{
            padding: "14px 36px", background: "#e8c060", color: "#080810",
            border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? "جاري الرفع..." : "ارفع البيانات ←"}
        </button>
      )}

      {status && (
        <div style={{
          padding: "12px 24px", background: "#16162a", borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.1)", fontSize: 15
        }}>
          {status}
        </div>
      )}

      {done && (
        <p style={{ color: "#e8c060", fontSize: 14 }}>
          الآن افتح الداشبورد وأضف الصور لكل منتج وصنف 🎉
        </p>
      )}
    </div>
  );
}