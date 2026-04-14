import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.(mdx|md)$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return { slug, ...data };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByCategory(category) {
  return getAllPosts().filter((p) => p.category === category || (Array.isArray(p.categories) && p.categories.includes(category)));
}

export async function getPostBySlug(slug) {
  const extensions = ['.mdx', '.md'];
  let fullPath = null;
  for (const ext of extensions) {
    const candidate = path.join(postsDirectory, `${slug}${ext}`);
    if (fs.existsSync(candidate)) { fullPath = candidate; break; }
  }
  if (!fullPath) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(remarkHtml).process(content);
  const contentHtml = processedContent.toString();
  return { slug, ...data, contentHtml };
}

export function daysUntil(dateStr) {
  const target = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}
