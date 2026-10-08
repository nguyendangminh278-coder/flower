import { FormEvent, ReactNode, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Flower2, Instagram, Linkedin, Twitter, Layers3, Sparkles, MapPin, ArrowUpRight } from "lucide-react";
import { HlsVideo } from "@/components/HlsVideo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HERO_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4";
const MISSION_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4";
const SOLUTION_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4";
const CTA_HLS = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

function LilyMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? "h-7 w-7" : size === "lg" ? "h-12 w-12" : "h-9 w-9";
  const inner = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
  return (
    <span className={`relative grid ${dim} place-items-center rounded-full border-2 border-foreground/60`}>
      <span className={`rounded-full border border-foreground/60 ${inner}`} />
    </span>
  );
}

function TripleTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`triple-title ${className}`}>
      <div className="ghost ghost-a" aria-hidden>{children}</div>
      <div className="ghost ghost-b" aria-hidden>{children}</div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function RevealWord({ word, index, count, progress, isHighlight }: { word: string; index: number; count: number; progress: ReturnType<typeof useScroll>["scrollYProgress"]; isHighlight: boolean }) {
  const start = index / Math.max(count, 1);
  const end = Math.min(1, start + 0.16);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={isHighlight ? "text-foreground" : "text-[hsl(var(--hero-subtitle))]"}>
      {word}
    </motion.span>
  );
}

function WordReveal({ text, highlight = [] }: { text: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const words = useMemo(() => text.split(" "), [text]);
  const highlightSet = useMemo(() => new Set(highlight.map((x) => x.toLowerCase())), [highlight]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });

  return (
    <p ref={ref} className="word-reveal flex flex-wrap gap-x-[.28em] gap-y-1">
      {words.map((word, index) => {
        const clean = word.replace(/[—,.]/g, "").toLowerCase();
        return (
          <RevealWord
            key={`${word}-${index}`}
            word={word}
            index={index}
            count={words.length}
            progress={scrollYProgress}
            isHighlight={highlightSet.has(clean)}
          />
        );
      })}
    </p>
  );
}

const featureCards = [
  { icon: Flower2, title: "Tươi", copy: "Chỉ chọn Hoa Ly có form đẹp, cành khỏe và độ nở phù hợp với thời điểm trao tặng." },
  { icon: Layers3, title: "Chắc", copy: "Tỷ lệ thân, giấy và điểm giữ được xử lý để bó hoa có cấu trúc vững, cầm đẹp và lên ảnh tốt." },
  { icon: Sparkles, title: "Chỉn chu", copy: "Ít chi tiết thừa, hoàn thiện sạch, sang và có chủ đích — từ lớp giấy cuối tới tấm thiệp nhỏ." },
];

const solutionFeatures = [
  ["Chọn cành", "Độ nở và chiều dài được chọn theo thời điểm tặng."],
  ["Phối sắc", "Một loài hoa nhưng nhiều sắc độ và cảm xúc."],
  ["Tỷ lệ", "Số cành, chiều cao và form bó được cân theo người nhận."],
  ["Hoàn thiện", "Bó chắc, giấy sạch, đường gấp gọn và không dư chi tiết."],
];

function App() {
  const [sent, setSent] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const scale = useSpring(useTransform(heroProgress, [0, 1], [1, 1.12]), { stiffness: 120, damping: 24 });
  const y = useSpring(useTransform(heroProgress, [0, 1], [0, 90]), { stiffness: 120, damping: 24 });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-8 py-4 md:px-16 lg:px-28">
        <a href="#home" className="flex items-center gap-3 font-bold tracking-tight"><LilyMark size="sm" />Hoa Kiều Linh</a>
        <div className="hidden items-center gap-3 text-sm text-muted-foreground md:flex">
          {["Trang chủ", "Hoa Ly", "Triết lý", "Đặt hoa"].map((item, index) => (
            <span key={item} className="flex items-center gap-3">
              {index > 0 && <span className="text-foreground/30">•</span>}
              <a className="transition-colors hover:text-foreground" href={["#home", "#hoa-ly", "#triet-ly", "#dat-hoa"][index]}>{item}</a>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {[Instagram, Linkedin, Twitter].map((Icon, i) => (
            <Button aria-label={`Mạng xã hội ${i + 1}`} key={i} variant="glass" size="icon"><Icon className="h-4 w-4" /></Button>
          ))}
        </div>
      </nav>

      <section ref={heroRef} id="home" className="noise relative flex min-h-screen items-center justify-center overflow-hidden">
        <motion.video style={{ scale, y }} className="hero-video absolute inset-0 h-full w-full object-cover" src={HERO_VIDEO} autoPlay muted loop playsInline />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-28 text-center md:pt-32">
          <motion.div {...fadeUp(0)} className="mb-7 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {["https://images.unsplash.com/photo-1542768651-5d7354d0b782?auto=format&fit=crop&w=80&q=70", "https://images.unsplash.com/photo-1749221479901-8c901e5150aa?auto=format&fit=crop&w=80&q=70", "https://images.unsplash.com/photo-1749221479542-83fee706727d?auto=format&fit=crop&w=80&q=70"].map((src) => (
                <img key={src} src={src} className="h-8 w-8 rounded-full border-2 border-background object-cover grayscale" alt="Chi tiết hoa Ly" />
              ))}
            </div>
            <span>Chỉ Hoa Ly · Tây Mỗ · Hà Nội</span>
          </motion.div>

          <motion.div {...fadeUp(.08)}>
            <TripleTitle className="select-none">
              <h1 className="max-w-6xl text-5xl font-medium tracking-[-2.6px] md:text-7xl lg:text-[7.2rem] lg:leading-[.92]">
                Một loài hoa. <span className="font-serif font-normal italic">Vô hạn</span> cảm xúc.
              </h1>
            </TripleTitle>
          </motion.div>

          <motion.p {...fadeUp(.16)} className="mt-7 max-w-2xl text-base leading-7 text-[hsl(var(--hero-subtitle))] md:text-lg">
            Hoa Kiều Linh chỉ chọn Hoa Ly — để tập trung toàn bộ sự chăm chút vào độ tươi, form bó, tỷ lệ và khoảnh khắc người nhận mở món quà.
          </motion.p>

          <motion.form {...fadeUp(.24)} onSubmit={handleSubmit} className="liquid-glass mt-9 flex w-full max-w-lg items-center rounded-full p-2">
            <Input required aria-label="Số điện thoại" className="h-12" placeholder="Số điện thoại để tư vấn nhanh" />
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: .98 }} className="whitespace-nowrap rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background">ĐẶT HOA</motion.button>
          </motion.form>
          {sent && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-xs text-muted-foreground">Đã ghi nhận yêu cầu demo — phần gửi dữ liệu sẽ được nối khi triển khai thật.</motion.p>}
        </div>
      </section>

      <section id="hoa-ly" className="px-6 pb-9 pt-52 text-center md:px-12 md:pt-64">
        <motion.h2 {...fadeUp(0)} className="mx-auto max-w-6xl text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl">
          Một tiệm hoa không cần bán <span className="font-serif font-normal italic">mọi thứ.</span>
        </motion.h2>
        <motion.p {...fadeUp(.08)} className="mx-auto mb-24 mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
          Khi chỉ làm một loài hoa, từng quyết định nhỏ — cành nào được chọn, bó cao bao nhiêu, giấy gấp ra sao — đều có thể được làm kỹ hơn.
        </motion.p>

        <div className="mx-auto mb-20 grid max-w-6xl gap-12 md:grid-cols-3 md:gap-8">
          {featureCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article {...fadeUp(.08 * index)} key={card.title} className="flex flex-col items-center">
                <div className="liquid-glass mb-7 grid h-[200px] w-[200px] place-items-center rounded-full">
                  <Icon strokeWidth={1.15} className="h-20 w-20 text-foreground/90" />
                </div>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{card.copy}</p>
              </motion.article>
            );
          })}
        </div>
        <motion.p {...fadeUp(.12)} className="text-sm text-muted-foreground">Khi chỉ làm một loài hoa, từng chi tiết phải tốt hơn.</motion.p>
      </section>

      <section id="triet-ly" className="px-6 pb-32 pt-0 md:px-12 md:pb-44">
        <motion.div {...fadeUp(0)} className="mx-auto aspect-square w-full max-w-[800px] overflow-hidden rounded-[2rem]">
          <video src={MISSION_VIDEO} autoPlay muted loop playsInline className="media-mono h-full w-full object-cover" />
        </motion.div>

        <div className="mx-auto mt-24 max-w-6xl">
          <div className="text-2xl font-medium leading-[1.18] tracking-[-1px] md:text-4xl lg:text-5xl">
            <WordReveal
              text="Chúng tôi xây một tiệm hoa nơi sự tinh giản tạo nên chất lượng — nơi mỗi cành Ly được chọn kỹ, mỗi bó hoa có nhịp điệu, và mỗi món quà đủ hiện diện để người nhận nhớ."
              highlight={["tinh", "giản", "tạo", "nên", "chất", "lượng"]}
            />
          </div>
          <div className="mt-10 text-xl font-medium leading-[1.35] md:text-2xl lg:text-3xl">
            <WordReveal text="Ít lựa chọn hơn. Ít nhiễu hơn. Nhiều sự chăm chút hơn — từ màu sắc, tỷ lệ, cách gói cho tới lời nhắn đi cùng." />
          </div>
        </div>
      </section>

      <section className="border-t border-border/30 px-6 py-32 md:px-12 md:py-44">
        <div className="mx-auto max-w-6xl">
          <motion.p {...fadeUp(0)} className="text-xs uppercase tracking-[3px] text-muted-foreground">HOA LY / THE SYSTEM</motion.p>
          <motion.h2 {...fadeUp(.07)} className="mt-5 max-w-4xl text-4xl font-medium tracking-[-1.5px] md:text-6xl">
            Ba khí chất, một loài <span className="font-serif font-normal italic">Ly.</span>
          </motion.h2>
          <motion.div {...fadeUp(.14)} className="mt-14 aspect-[3/1] overflow-hidden rounded-2xl">
            <video src={SOLUTION_VIDEO} autoPlay muted loop playsInline className="media-mono h-full w-full object-cover" />
          </motion.div>
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {solutionFeatures.map(([title, copy], index) => (
              <motion.div {...fadeUp(.06 * index)} key={title}>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="dat-hoa" className="relative overflow-hidden border-t border-border/30 px-6 py-32 md:px-12 md:py-44">
        <HlsVideo src={CTA_HLS} className="media-mono absolute inset-0 z-0 h-full w-full object-cover" />
        <div className="absolute inset-0 z-[1] bg-background/55" />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.div {...fadeUp(0)}><LilyMark size="lg" /></motion.div>
          <motion.h2 {...fadeUp(.08)} className="mt-7 text-5xl font-serif font-normal italic tracking-[-1.5px] md:text-7xl">Đặt bó Ly của bạn</motion.h2>
          <motion.p {...fadeUp(.14)} className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            Tòa GS3, Vinhomes Smart City, Tây Mỗ, Hà Nội. Chọn cảm giác bạn muốn trao — phần còn lại để Hoa Kiều Linh chăm chút.
          </motion.p>
          <motion.div {...fadeUp(.2)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-[52px] px-8"><a href="#home">Đặt hoa ngay <ArrowUpRight className="ml-2 h-4 w-4" /></a></Button>
            <Button asChild variant="glass" className="h-[52px] px-8"><a href="https://maps.google.com/?q=Vinhomes+Smart+City+Tay+Mo+Ha+Noi" target="_blank" rel="noreferrer"><MapPin className="mr-2 h-4 w-4" /> Xem địa chỉ</a></Button>
          </motion.div>
        </div>
      </section>

      <footer className="flex flex-col gap-6 px-8 py-12 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-28">
        <span>© 2026 Hoa Kiều Linh. Chỉ Hoa Ly.</span>
        <div className="flex gap-7">
          <a className="transition-colors hover:text-foreground" href="#triet-ly">Triết lý</a>
          <a className="transition-colors hover:text-foreground" href="#hoa-ly">Hoa Ly</a>
          <a className="transition-colors hover:text-foreground" href="#dat-hoa">Liên hệ</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
