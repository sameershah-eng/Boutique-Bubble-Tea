import React from 'react';
import { motion } from 'motion/react';
import { Instagram, ExternalLink } from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

const INSTA_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558857563-b37cf5ef1c78?auto=format&fit=crop&w=600&q=80',
    caption: 'Warm brown sugar boba dripping fresh at 70 Commercial St.',
    likes: 428,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
    caption: 'Ceremonial Uji matcha whisked to order with velvety oat milk.',
    likes: 365,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80',
    caption: 'Strawberry cloud tea layered with Himalayan pink cheese foam.',
    likes: 512,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=600&q=80',
    caption: 'Alfonso mango passionfruit fizz on a sunny London afternoon.',
    likes: 290,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
    caption: 'Crispy fried basil popcorn chicken straight from the fryer.',
    likes: 640,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80',
    caption: 'Madagascar vanilla custard taiyaki waffles hot off the irons.',
    likes: 489,
  },
];

export const InstagramSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#6FE3E1] font-semibold mb-2">
            <Instagram className="w-3.5 h-3.5" />
            <span>@hydor_uk_london</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#FBF6EF]">
            Follow the <span className="font-serif-italic font-normal gradient-text-hero">daily drops</span>.
          </h2>
          <p className="mt-1 text-sm text-[#FBF6EF]/70">
            Tag us in your Shoreditch boba run for a chance to be featured.
          </p>
        </div>

        <a
          href="https://www.instagram.com/hydor_uk_london"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill text-xs sm:text-sm font-semibold text-white hover:border-[#FF8FB1] hover:scale-105 transition-all group self-start sm:self-auto"
        >
          <Instagram className="w-4 h-4 text-[#FF8FB1]" />
          <span>Follow on Instagram</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
        </a>
      </div>

      {/* 6 Grid Posts */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {INSTA_POSTS.map((post, idx) => (
          <motion.a
            key={post.id}
            href="https://www.instagram.com/hydor_uk_london"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-[#1B1428] border border-white/10 block"
          >
            <img
              src={post.image}
              alt={post.caption}
              loading="lazy"
              onError={(e) => handleImageError(e, 'HYDOR London', 'Instagram')}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[#0E0B1A]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
              <div className="flex justify-end">
                <Instagram className="w-4 h-4 text-[#FF8FB1]" />
              </div>
              <p className="text-[11px] line-clamp-3 leading-snug text-white/90">
                {post.caption}
              </p>
              <span className="text-[10px] font-mono text-[#FFB570]">♥ {post.likes}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
