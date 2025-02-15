import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export', // ใช้ static export
  basePath: isGithubActions ? '/my-new-profile' : '', // ตั้งค่า basePath สำหรับ GitHub Pages
  assetPrefix: isGithubActions ? '/my-new-profile/' : '', // ตั้งค่า assetPrefix สำหรับ GitHub Pages
  images: {
    unoptimized: true, // ปิดการ optimize รูปภาพเพื่อให้ทำงานกับ static export
  },
};

export default nextConfig;