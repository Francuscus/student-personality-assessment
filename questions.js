// Big Five Personality Assessment Questions
// Each trait has 10 questions (50 total)
// Some questions are reverse-scored (marked with reverse: true)

const questions = [
    // OPENNESS TO EXPERIENCE (Questions 1-10)
    {
        id: 1,
        text: "I enjoy trying new and different activities.",
        trait: "openness",
        reverse: false
    },
    {
        id: 2,
        text: "I have a vivid imagination.",
        trait: "openness",
        reverse: false
    },
    {
        id: 3,
        text: "I prefer sticking to familiar routines.",
        trait: "openness",
        reverse: true
    },
    {
        id: 4,
        text: "I am interested in learning about different cultures and ideas.",
        trait: "openness",
        reverse: false
    },
    {
        id: 5,
        text: "I enjoy artistic and creative activities.",
        trait: "openness",
        reverse: false
    },
    {
        id: 6,
        text: "I prefer practical solutions over creative ones.",
        trait: "openness",
        reverse: true
    },
    {
        id: 7,
        text: "I often think about abstract concepts and theories.",
        trait: "openness",
        reverse: false
    },
    {
        id: 8,
        text: "I am curious about many different things.",
        trait: "openness",
        reverse: false
    },
    {
        id: 9,
        text: "I avoid trying things that are unfamiliar to me.",
        trait: "openness",
        reverse: true
    },
    {
        id: 10,
        text: "I appreciate beauty in art and nature.",
        trait: "openness",
        reverse: false
    },

    // CONSCIENTIOUSNESS (Questions 11-20)
    {
        id: 11,
        text: "I complete my homework and assignments on time.",
        trait: "conscientiousness",
        reverse: false
    },
    {
        id: 12,
        text: "I keep my belongings organized and tidy.",
        trait: "conscientiousness",
        reverse: false
    },
    {
        id: 13,
        text: "I often procrastinate on important tasks.",
        trait: "conscientiousness",
        reverse: true
    },
    {
        id: 14,
        text: "I make plans and stick to them.",
        trait: "conscientiousness",
        reverse: false
    },
    {
        id: 15,
        text: "I pay attention to details in my work.",
        trait: "conscientiousness",
        reverse: false
    },
    {
        id: 16,
        text: "I sometimes forget important deadlines.",
        trait: "conscientiousness",
        reverse: true
    },
    {
        id: 17,
        text: "I work hard to achieve my goals.",
        trait: "conscientiousness",
        reverse: false
    },
    {
        id: 18,
        text: "I think carefully before making decisions.",
        trait: "conscientiousness",
        reverse: false
    },
    {
        id: 19,
        text: "I find it hard to stay focused on tasks.",
        trait: "conscientiousness",
        reverse: true
    },
    {
        id: 20,
        text: "I am reliable and can be counted on.",
        trait: "conscientiousness",
        reverse: false
    },

    // EXTRAVERSION (Questions 21-30)
    {
        id: 21,
        text: "I enjoy being the center of attention.",
        trait: "extraversion",
        reverse: false
    },
    {
        id: 22,
        text: "I feel energized after spending time with friends.",
        trait: "extraversion",
        reverse: false
    },
    {
        id: 23,
        text: "I prefer to spend time alone rather than in groups.",
        trait: "extraversion",
        reverse: true
    },
    {
        id: 24,
        text: "I start conversations easily with new people.",
        trait: "extraversion",
        reverse: false
    },
    {
        id: 25,
        text: "I am talkative and outgoing.",
        trait: "extraversion",
        reverse: false
    },
    {
        id: 26,
        text: "I feel uncomfortable in large social gatherings.",
        trait: "extraversion",
        reverse: true
    },
    {
        id: 27,
        text: "I enjoy participating in group activities.",
        trait: "extraversion",
        reverse: false
    },
    {
        id: 28,
        text: "I am enthusiastic and full of energy.",
        trait: "extraversion",
        reverse: false
    },
    {
        id: 29,
        text: "I tend to be quiet around people I don't know.",
        trait: "extraversion",
        reverse: true
    },
    {
        id: 30,
        text: "I like to take charge in group situations.",
        trait: "extraversion",
        reverse: false
    },

    // AGREEABLENESS (Questions 31-40)
    {
        id: 31,
        text: "I care about other people's feelings.",
        trait: "agreeableness",
        reverse: false
    },
    {
        id: 32,
        text: "I am willing to help others when they need it.",
        trait: "agreeableness",
        reverse: false
    },
    {
        id: 33,
        text: "I sometimes put my needs before others.",
        trait: "agreeableness",
        reverse: true
    },
    {
        id: 34,
        text: "I try to be kind and considerate to everyone.",
        trait: "agreeableness",
        reverse: false
    },
    {
        id: 35,
        text: "I cooperate well with others in team projects.",
        trait: "agreeableness",
        reverse: false
    },
    {
        id: 36,
        text: "I find it hard to trust people I've just met.",
        trait: "agreeableness",
        reverse: true
    },
    {
        id: 37,
        text: "I try to avoid conflicts with others.",
        trait: "agreeableness",
        reverse: false
    },
    {
        id: 38,
        text: "I forgive others easily when they make mistakes.",
        trait: "agreeableness",
        reverse: false
    },
    {
        id: 39,
        text: "I can be critical of others' ideas.",
        trait: "agreeableness",
        reverse: true
    },
    {
        id: 40,
        text: "I enjoy making others feel happy.",
        trait: "agreeableness",
        reverse: false
    },

    // NEUROTICISM (Questions 41-50)
    {
        id: 41,
        text: "I often feel anxious or worried.",
        trait: "neuroticism",
        reverse: false
    },
    {
        id: 42,
        text: "I get stressed easily about school or tests.",
        trait: "neuroticism",
        reverse: false
    },
    {
        id: 43,
        text: "I stay calm even in difficult situations.",
        trait: "neuroticism",
        reverse: true
    },
    {
        id: 44,
        text: "My mood changes frequently.",
        trait: "neuroticism",
        reverse: false
    },
    {
        id: 45,
        text: "I often feel sad or down.",
        trait: "neuroticism",
        reverse: false
    },
    {
        id: 46,
        text: "I rarely feel nervous before important events.",
        trait: "neuroticism",
        reverse: true
    },
    {
        id: 47,
        text: "I get upset easily when things don't go as planned.",
        trait: "neuroticism",
        reverse: false
    },
    {
        id: 48,
        text: "I tend to worry about what others think of me.",
        trait: "neuroticism",
        reverse: false
    },
    {
        id: 49,
        text: "I handle pressure well without feeling overwhelmed.",
        trait: "neuroticism",
        reverse: true
    },
    {
        id: 50,
        text: "I often feel self-conscious in social situations.",
        trait: "neuroticism",
        reverse: false
    }
];

// Trait information for results display
const traitInfo = {
    openness: {
        name: "Openness to Experience",
        color: "#FF6384",
        highDescription: "You have a strong imagination and are very creative. You enjoy trying new things, exploring ideas, and appreciate art and beauty. You're curious about the world and open to different perspectives.",
        lowDescription: "You prefer familiar routines and practical approaches. You're more conventional in your thinking and tend to focus on concrete facts rather than abstract ideas.",
        moderateDescription: "You balance creativity with practicality. You're open to new experiences but also value some routine and structure in your life."
    },
    conscientiousness: {
        name: "Conscientiousness",
        color: "#36A2EB",
        highDescription: "You are highly organized, reliable, and goal-oriented. You plan ahead, pay attention to details, and work hard to achieve your objectives. You're dependable and responsible.",
        lowDescription: "You prefer flexibility over strict planning. You may find it challenging to stay organized and might procrastinate on tasks. You're more spontaneous in your approach.",
        moderateDescription: "You have a good balance of organization and flexibility. You can be disciplined when needed but also know when to be more relaxed about deadlines."
    },
    extraversion: {
        name: "Extraversion",
        color: "#FFCE56",
        highDescription: "You are outgoing, energetic, and enjoy social interactions. You feel energized by being around others and are comfortable in group settings. You're talkative and assertive.",
        lowDescription: "You prefer quieter, more solitary activities. You're more reserved and may need alone time to recharge. You think before speaking and are comfortable with smaller social circles.",
        moderateDescription: "You enjoy socializing but also value your alone time. You can be outgoing in familiar settings but may be more reserved in new situations."
    },
    agreeableness: {
        name: "Agreeableness",
        color: "#4BC0C0",
        highDescription: "You are compassionate, cooperative, and caring. You value harmony in relationships and are willing to help others. You're trusting, kind, and considerate of others' feelings.",
        lowDescription: "You tend to be more competitive and skeptical. You might prioritize your own needs and can be more direct in expressing disagreement. You value independence over cooperation.",
        moderateDescription: "You balance cooperation with independence. You're helpful and kind but also know when to stand up for yourself and express different opinions."
    },
    neuroticism: {
        name: "Neuroticism (Emotional Sensitivity)",
        color: "#9966FF",
        highDescription: "You experience emotions intensely and may be more prone to stress and anxiety. You're sensitive to your environment and may worry about things more than others.",
        lowDescription: "You are emotionally stable and calm under pressure. You rarely feel anxious or stressed and tend to maintain a positive, even mood.",
        moderateDescription: "You experience a normal range of emotions. Sometimes you feel stressed or worried, but you generally manage your emotions well."
    }
};
