/*
  # Seed Sample Tools Data

  1. Sample Tools
    - Add sample tools for each category to demonstrate the application
    - Include proper questions and system prompts for each tool
*/

-- Insert sample tools
INSERT INTO tools (name, slug, category, description, icon, prompt_intro, questions, system_prompt) VALUES
(
  'Facebook Ad Copy Generator',
  'facebook-ad-copy',
  'AD_COPY',
  'Generate compelling Facebook ad copy that converts',
  '📱',
  'Let''s create high-converting Facebook ad copy for your campaign.',
  '[
    {"label": "Product/Service Name", "type": "input"},
    {"label": "Target Audience", "type": "input"},
    {"label": "Key Benefits", "type": "textarea"},
    {"label": "Call to Action", "type": "input"}
  ]',
  'You are an expert Facebook ad copywriter. Create compelling, conversion-focused ad copy that grabs attention and drives action. Focus on benefits, use emotional triggers, and include a strong call to action.'
),
(
  'Google Ads Headline Creator',
  'google-ads-headlines',
  'AD_COPY',
  'Create attention-grabbing Google Ads headlines',
  '🔍',
  'Let''s craft powerful Google Ads headlines that get clicks.',
  '[
    {"label": "Product/Service", "type": "input"},
    {"label": "Main Keyword", "type": "input"},
    {"label": "Unique Selling Point", "type": "input"},
    {"label": "Target Location (optional)", "type": "input"}
  ]',
  'You are a Google Ads specialist. Create compelling headlines that are under 30 characters, include the main keyword, and highlight the unique selling proposition. Make them click-worthy and relevant.'
),
(
  'Client Onboarding Email',
  'client-onboarding-email',
  'CLIENT_MANAGEMENT',
  'Professional client onboarding email templates',
  '👋',
  'Let''s create a welcoming and professional client onboarding email.',
  '[
    {"label": "Client Name", "type": "input"},
    {"label": "Service/Project Type", "type": "input"},
    {"label": "Next Steps", "type": "textarea"},
    {"label": "Your Name/Company", "type": "input"}
  ]',
  'You are a professional client success manager. Create a warm, welcoming onboarding email that sets clear expectations, outlines next steps, and makes the client feel valued and confident in their decision.'
),
(
  'Copy Improvement Analyzer',
  'copy-improvement-analyzer',
  'COPY_IMPROVEMENT',
  'Analyze and improve existing copy for better performance',
  '✨',
  'Let''s analyze your existing copy and make it more compelling.',
  '[
    {"label": "Current Copy", "type": "textarea"},
    {"label": "Target Audience", "type": "input"},
    {"label": "Goal (sales, leads, awareness)", "type": "input"},
    {"label": "Tone (professional, casual, urgent)", "type": "input"}
  ]',
  'You are a copy optimization expert. Analyze the provided copy and suggest specific improvements for clarity, persuasion, and conversion. Provide the improved version and explain the changes made.'
),
(
  'Welcome Email Sequence',
  'welcome-email-sequence',
  'EMAIL_COPY',
  'Create engaging welcome email sequences for new subscribers',
  '📧',
  'Let''s create a compelling welcome email sequence that engages new subscribers.',
  '[
    {"label": "Business Name", "type": "input"},
    {"label": "What subscribers signed up for", "type": "input"},
    {"label": "Main value proposition", "type": "textarea"},
    {"label": "Number of emails in sequence", "type": "input"}
  ]',
  'You are an email marketing expert. Create a welcome email sequence that builds trust, delivers value, and nurtures subscribers toward becoming customers. Make each email engaging and actionable.'
),
(
  'Blog Post Outline Creator',
  'blog-post-outline',
  'LONG_FORM',
  'Generate detailed blog post outlines with SEO optimization',
  '📝',
  'Let''s create a comprehensive blog post outline that ranks and converts.',
  '[
    {"label": "Blog Post Topic", "type": "input"},
    {"label": "Target Keyword", "type": "input"},
    {"label": "Target Audience", "type": "input"},
    {"label": "Desired Word Count", "type": "input"}
  ]',
  'You are an SEO content strategist. Create a detailed blog post outline that is SEO-optimized, reader-friendly, and comprehensive. Include H2 and H3 headings, key points to cover, and suggestions for internal linking.'
),
(
  'Podcast Episode Description',
  'podcast-episode-description',
  'PODCAST_TOOLS',
  'Write compelling podcast episode descriptions that attract listeners',
  '🎙️',
  'Let''s create an engaging podcast episode description that draws listeners in.',
  '[
    {"label": "Episode Title", "type": "input"},
    {"label": "Main Topics Covered", "type": "textarea"},
    {"label": "Guest Name (if applicable)", "type": "input"},
    {"label": "Key Takeaways", "type": "textarea"}
  ]',
  'You are a podcast marketing expert. Create compelling episode descriptions that hook listeners, highlight key value, and encourage downloads. Include timestamps and key takeaways where relevant.'
),
(
  'Sales Page Headline Generator',
  'sales-page-headlines',
  'SALES_FUNNEL_COPY',
  'Generate high-converting sales page headlines',
  '💰',
  'Let''s create powerful sales page headlines that convert visitors into customers.',
  '[
    {"label": "Product/Service Name", "type": "input"},
    {"label": "Main Benefit", "type": "input"},
    {"label": "Target Customer Pain Point", "type": "textarea"},
    {"label": "Price Point", "type": "input"}
  ]',
  'You are a conversion copywriter specializing in sales pages. Create compelling headlines that address pain points, highlight benefits, and create urgency. Focus on emotional triggers and clear value propositions.'
)
ON CONFLICT (slug) DO NOTHING;