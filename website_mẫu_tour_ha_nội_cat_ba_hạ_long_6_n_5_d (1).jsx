import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Ship,
  MapPin,
  Trees,
  Calendar,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";

// Ảnh minh họa (có thể thay bằng ảnh của công ty bạn)
const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1600&auto=format&fit=crop",
  hanoi:
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200&auto=format&fit=crop",
  halong:
    "https://images.unsplash.com/photo-1564445129579-44163eb1752f?q=80&w=1200&auto=format&fit=crop",
  catba:
    "https://images.unsplash.com/photo-1545577939-7f02b03509d9?q=80&w=1200&auto=format&fit=crop",
};

const NAV_LINKS = [
  { id: "gioithieu", label: "Giới thiệu" },
  { id: "lichtrinh", label: "Lịch trình" },
  { id: "giatour", label: "Giá tour" },
  { id: "album", label: "Album" },
  { id: "lienhe", label: "Liên hệ" },
];

const features = [
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Hà Nội nghìn năm",
    desc: "Phố cổ, Hồ Gươm, Văn Miếu – tinh hoa văn hóa Bắc Bộ.",
  },
  {
    icon: <Ship className="w-5 h-5" />,
    title: "Du thuyền Hạ Long",
    desc: "Nghỉ đêm trên vịnh – khám phá hang động kỳ ảo.",
  },
  {
    icon: <Trees className="w-5 h-5" />,
    title: "Đảo Cát Bà",
    desc: "Rừng quốc gia, bãi tắm xanh, hải sản tươi ngon.",
  },
];

const itinerary = [
  {
    day: "Ngày 1",
    title: "Hà Nội City Tour",
    details:
      "Đón sân bay/khách sạn – Hồ Hoàn Kiếm, Phố cổ, Văn Miếu. Tối tự do thưởng thức ẩm thực.",
  },
  {
    day: "Ngày 2",
    title: "Hà Nội – Vịnh Hạ Long",
    details:
      "Khởi hành Hạ Long, lên du thuyền – ăn trưa trên tàu, chèo kayak, thăm hang động. Nghỉ đêm trên vịnh.",
  },
  {
    day: "Ngày 3",
    title: "Hạ Long – Cát Bà",
    details:
      "Dậy sớm ngắm bình minh – di chuyển sang Cát Bà, nhận phòng. Chiều tắm biển, dạo thị trấn.",
  },
  {
    day: "Ngày 4",
    title: "Rừng quốc gia Cát Bà",
    details:
      "Trekking nhẹ rừng Cát Bà – động Trung Trang/Phù Long – ngắm vịnh Lan Hạ. Tối BBQ hải sản.",
  },
  {
    day: "Ngày 5",
    title: "Cát Bà tự do",
    details:
      "Tự do nghỉ dưỡng, trải nghiệm chèo SUP/xe máy vòng đảo (tự túc).",
  },
  {
    day: "Ngày 6",
    title: "Cát Bà – Hà Nội",
    details:
      "Trả phòng – về Hà Nội, ghé mua đặc sản. Kết thúc tour, hẹn gặp lại!",
  },
];

const inclusions = [
  "Khách sạn 3–4* (phòng đôi)",
  "Xe đưa đón theo chương trình",
  "Vé tham quan, vé vào cửa",
  "Du thuyền 4–5* ngủ đêm 1 đêm",
  "Hướng dẫn viên chuyên nghiệp",
  "Bữa ăn theo lịch trình",
];

const exclusions = [
  "Chi phí cá nhân, đồ uống ngoài thực đơn",
  "Vé máy bay/tàu (nếu có)",
  "VAT (theo quy định)",
  "Phụ thu phòng đơn",
];

export default function TourLandingHN_HL_CB() {
  const [openMenu, setOpenMenu] = useState(false);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 text-slate-800">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">VietTrip</span>
            <Badge className="rounded-full">Tour 6N5Đ</Badge>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((l) => (
              <Button key={l.id} variant="ghost" onClick={() => scrollToId(l.id)}>
                {l.label}
              </Button>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-2xl">Đặt tour</Button>
              </DialogTrigger>
              <BookingDialog />
            </Dialog>
          </nav>
          <Button className="md:hidden" variant="ghost" onClick={() => setOpenMenu((s) => !s)}>
            {openMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        {openMenu && (
          <div className="md:hidden border-t bg-white">
            <div className="max-w-6xl mx-auto px-4 py-2 grid gap-1">
              {NAV_LINKS.map((l) => (
                <Button key={l.id} variant="ghost" className="justify-start" onClick={() => {setOpenMenu(false); scrollToId(l.id);}}>
                  {l.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative">
        <img src={IMAGES.hero} alt="Vịnh Hạ Long" className="w-full h-[60vh] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
        <div className="absolute inset-0 max-w-6xl mx-auto px-4 flex flex-col justify-end pb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-3xl md:text-5xl font-extrabold drop-shadow"
          >
            Khám phá Hà Nội – Cát Bà – Hạ Long
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/90 mt-3 text-base md:text-lg max-w-2xl"
          >
            Hành trình 6 ngày 5 đêm: văn hóa – thiên nhiên – nghỉ dưỡng trọn vẹn. Khởi hành hằng tuần từ Hà Nội.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            <Badge className="rounded-full">Du thuyền ngủ đêm</Badge>
            <Badge className="rounded-full">Vịnh Lan Hạ</Badge>
            <Badge className="rounded-full">Phố cổ Hà Nội</Badge>
          </motion.div>
          <div className="mt-6 flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="rounded-2xl">Đặt tour ngay</Button>
              </DialogTrigger>
              <BookingDialog />
            </Dialog>
            <Button size="lg" variant="secondary" className="rounded-2xl" onClick={() => scrollToId("lichtrinh")}>Xem lịch trình</Button>
          </div>
        </div>
      </section>

      {/* Giới thiệu */}
      <section id="gioithieu" className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <Card className="h-full rounded-2xl">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sky-700">{f.icon}<CardTitle className="text-lg">{f.title}</CardTitle></div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lịch trình */}
      <section id="lichtrinh" className="bg-white py-14 border-t">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5" />
            <h2 className="text-2xl md:text-3xl font-bold">Lịch trình chi tiết (6N5Đ)</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {itinerary.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.05 }}>
                <Card className="rounded-2xl h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sky-600 font-semibold">{item.day}</p>
                        <CardTitle className="text-xl mt-1">{item.title}</CardTitle>
                      </div>
                      <Clock className="w-5 h-5 text-slate-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">{item.details}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Giá tour */}
      <section id="giatour" className="py-14 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Giá tour & Dịch vụ</h2>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Giá từ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-extrabold">8.900.000₫</p>
                <p className="text-slate-500 text-sm mt-1">/ khách (nhóm từ 6 khách)</p>
                <div className="mt-4 grid gap-2">
                  {[
                    "Khởi hành hằng tuần",
                    "Không phụ thu ẩn",
                    "Miễn phí tư vấn 24/7",
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-slate-600 text-sm">{t}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Giá bao gồm</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                  {inclusions.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Không bao gồm</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                  {exclusions.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="rounded-2xl">Nhận báo giá chi tiết</Button>
              </DialogTrigger>
              <BookingDialog />
            </Dialog>
            <Button size="lg" variant="secondary" className="rounded-2xl" onClick={() => scrollToId("lienhe")}>Liên hệ ngay</Button>
          </div>
        </div>
      </section>

      {/* Album */}
      <section id="album" className="py-14 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Album hành trình</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[IMAGES.hanoi, IMAGES.halong, IMAGES.catba].map((src, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl overflow-hidden shadow">
                <img src={src} alt="album" className="w-full h-64 object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Liên hệ */}
      <section id="lienhe" className="py-14 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Liên hệ & Đặt tour</h2>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Gửi yêu cầu</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Thông tin công ty</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-700">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> Hotline: 09xx xxx xxx</p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email: sales@viettrip.vn</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Địa chỉ: Quận Hoàn Kiếm, Hà Nội</p>
                <p className="text-sm text-slate-500">* Điền form, chúng tôi sẽ gọi lại trong 15 phút làm việc.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-600">© {new Date().getFullYear()} VietTrip Travel. All rights reserved.</p>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => scrollToId("gioithieu")}>Giới thiệu</Button>
            <Button variant="ghost" onClick={() => scrollToId("lichtrinh")}>Lịch trình</Button>
            <Button variant="ghost" onClick={() => scrollToId("giatour")}>Giá tour</Button>
            <Button variant="ghost" onClick={() => scrollToId("lienhe")}>Liên hệ</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BookingDialog() {
  return (
    <DialogContent className="rounded-2xl">
      <DialogHeader>
        <DialogTitle>Đặt tour Hà Nội – Cát Bà – Hạ Long</DialogTitle>
      </DialogHeader>
      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label>Họ và tên</Label>
          <Input placeholder="Nguyễn Văn A" />
        </div>
        <div className="grid gap-2">
          <Label>Số điện thoại</Label>
          <Input placeholder="09xx xxx xxx" />
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input type="email" placeholder="you@example.com" />
        </div>
        <div className="grid gap-2">
          <Label>Ngày khởi hành dự kiến</Label>
          <Input type="date" />
        </div>
        <div className="grid gap-2">
          <Label>Số khách</Label>
          <Input type="number" min={1} defaultValue={2} />
        </div>
        <Button className="mt-2 rounded-2xl">Gửi yêu cầu</Button>
      </div>
    </DialogContent>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-2">
        <Label>Họ và tên</Label>
        <Input required placeholder="Tên của bạn" />
      </div>
      <div className="grid gap-2">
        <Label>Số điện thoại</Label>
        <Input required placeholder="09xx xxx xxx" />
      </div>
      <div className="grid gap-2">
        <Label>Email</Label>
        <Input type="email" placeholder="you@example.com" />
      </div>
      <div className="grid gap-2">
        <Label>Nội dung</Label>
        <Textarea rows={4} placeholder="Tư vấn lịch khởi hành, nâng hạng du thuyền, yêu cầu riêng..." />
      </div>
      {sent ? (
        <p className="text-green-600 text-sm">Đã gửi! Chúng tôi sẽ liên hệ sớm nhất.</p>
      ) : (
        <Button type="submit" className="rounded-2xl">Gửi liên hệ</Button>
      )}
    </form>
  );
}
