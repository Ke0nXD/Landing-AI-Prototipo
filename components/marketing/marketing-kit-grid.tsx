import {
  BadgeCheck,
  Megaphone,
  MessageCircle,
  Palette,
  Sparkles,
} from "lucide-react";
import type { MarketingKit } from "@/types/landing";
import { Panel } from "@/components/ui/panel";

interface MarketingKitGridProps {
  kit: MarketingKit;
  compact?: boolean;
}

export function MarketingKitGrid({ kit, compact }: MarketingKitGridProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-cyan-300/15 text-cyan-200">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Ideias para Instagram
              </h3>
              <p className="text-sm text-slate-400">
                Conteudos prontos para transformar a landing em campanha.
              </p>
            </div>
          </div>
          <div className="grid gap-3">
            {kit.instagramPosts.map((post) => (
              <div
                className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-slate-300"
                key={post}
              >
                {post}
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid gap-4">
          <Panel className="p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-violet-400/15 text-violet-200">
                <Megaphone className="size-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Chamadas para anuncio
              </h3>
            </div>
            <div className="grid gap-3">
              {kit.adHooks.map((hook) => (
                <p className="text-sm text-slate-300" key={hook}>
                  {hook}
                </p>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-emerald-400/15 text-emerald-200">
                <MessageCircle className="size-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                WhatsApp comercial
              </h3>
            </div>
            <div className="grid gap-3">
              {kit.whatsappMessages.map((message) => (
                <p className="rounded-lg bg-emerald-300/10 p-3 text-sm text-emerald-50" key={message}>
                  {message}
                </p>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-amber-300/15 text-amber-200">
              <BadgeCheck className="size-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Bio e pitch</h3>
          </div>
          <p className="text-sm font-medium text-cyan-100">{kit.bio}</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">{kit.pitch}</p>
        </Panel>

        <Panel className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-cyan-300/15 text-cyan-200">
              <Palette className="size-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Assets exportaveis
            </h3>
          </div>
          <div
            className={
              compact ? "grid gap-3" : "grid gap-3 sm:grid-cols-2"
            }
          >
            {Object.entries(kit.assetSuggestions).map(([key, value]) => (
              <div
                className="rounded-lg border border-white/10 bg-white/[0.04] p-3"
                key={key}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {assetLabels[key as keyof MarketingKit["assetSuggestions"]]}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{value}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

const assetLabels: Record<keyof MarketingKit["assetSuggestions"], string> = {
  coverImage: "Capa",
  promotionalMockup: "Mockup",
  socialBanner: "Banner",
  thumbnail: "Thumbnail",
};
