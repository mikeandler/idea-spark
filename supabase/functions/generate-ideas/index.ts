import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface OnboardingData {
  interests: string[];
  skillLevel: string;
  timeCommitment: string;
  existingTools: string[];
  targetAudience: string;
  primaryGoal: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { onboardingData } = await req.json() as { onboardingData: OnboardingData };
    
    console.log("Generating ideas for:", JSON.stringify(onboardingData));

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert AI product strategist specializing in microapps, utilities, and web applications. Your goal is to generate highly marketable, actionable AI-powered app ideas tailored to the user's profile.

IMPORTANT: Prioritize a DIVERSE range of ideas across these categories:
- **Utility Tools**: File converters, data transformers, batch processors, format validators, cleanup tools
- **Efficiency Boosters**: Automation helpers, workflow optimizers, time-savers, task batchers
- **Productivity Enhancers**: Note-takers, summarizers, organizers, schedulers, trackers
- **Creative Tools**: Generators, editors, enhancers, remixers
- **Analysis Tools**: Data analyzers, trend spotters, insight extractors, comparators
- **Integration Bridges**: API connectors, sync tools, data migrators, webhook handlers

You will receive information about:
- User's interests and passions
- Their technical skill level (no-code to architect)
- Available time commitment
- Existing tools they use
- Target audience
- Primary motivation

Generate exactly 3 unique microapp/webapp ideas that:
1. Leverage AI capabilities meaningfully (but don't force AI where simple logic works better)
2. Match the user's skill level
3. Can be built within their time constraints
4. Have clear market potential or solve real daily friction points
5. Use tools they're familiar with when possible
6. Focus on PRACTICAL UTILITY - tools people will actually use daily/weekly
7. Include at least ONE utility/efficiency-focused idea

Think beyond chatbots and content generators. Consider:
- Tools that save people 5-10 minutes daily on repetitive tasks
- Utilities that bridge gaps between popular services
- Efficiency tools for specific professions or workflows
- Batch processing tools for common file/data operations
- Smart automation for tedious manual processes

For each idea, provide:
- A catchy, memorable title
- A compelling 2-3 sentence description focusing on the PROBLEM it solves
- Complexity level (beginner/intermediate/advanced)
- Realistic time estimate to MVP
- 4 key features
- Recommended tech stack (focus on no-code/low-code for beginners)
- Monetization strategy

Respond ONLY with valid JSON in this exact format:
{
  "ideas": [
    {
      "title": "string",
      "description": "string",
      "complexity": "beginner" | "intermediate" | "advanced",
      "timeEstimate": "string",
      "keyFeatures": ["string", "string", "string", "string"],
      "techStack": ["string", "string", "string"],
      "monetization": "string"
    }
  ]
}`;

    const userPrompt = `Generate 3 AI microapp ideas for a user with this profile:

**Interests:** ${onboardingData.interests.join(', ')}
**Skill Level:** ${onboardingData.skillLevel}
**Time Available:** ${onboardingData.timeCommitment}
**Tools They Use:** ${onboardingData.existingTools.join(', ')}
**Target Audience:** ${onboardingData.targetAudience}
**Primary Goal:** ${onboardingData.primaryGoal}

Remember to:
- Match complexity to their skill level (${onboardingData.skillLevel})
- Suggest ideas achievable in their available time (${onboardingData.timeCommitment})
- Focus on AI-powered features that solve real problems
- Make ideas specific and actionable, not generic
- Consider current market trends and opportunities`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("Raw AI response:", content);

    // Parse the JSON from the response (handling potential markdown code blocks)
    let jsonStr = content;
    if (content.includes("```json")) {
      jsonStr = content.split("```json")[1].split("```")[0].trim();
    } else if (content.includes("```")) {
      jsonStr = content.split("```")[1].split("```")[0].trim();
    }

    const parsedIdeas = JSON.parse(jsonStr);

    return new Response(JSON.stringify(parsedIdeas), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating ideas:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to generate ideas" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
