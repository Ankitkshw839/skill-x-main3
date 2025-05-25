import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

// Define image categories for different course types
const courseImageCategories = {
    programming: [
        "https://img.freepik.com/free-vector/programmers-using-javascript-programming-language-computer-tiny-people-javascript-language-javascript-engine-js-web-development-concept_335657-2412.jpg",
        "https://img.freepik.com/free-vector/hand-coding-concept-illustration_114360-8193.jpg",
        "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg",
        "https://img.freepik.com/free-vector/desktop-smartphone-app-development_23-2148683130.jpg"
    ],
    design: [
        "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg",
        "https://img.freepik.com/free-vector/gradient-ui-ux-illustration_52683-69272.jpg",
        "https://img.freepik.com/free-vector/website-designer-concept-illustration_114360-4100.jpg",
        "https://img.freepik.com/free-vector/design-process-concept-illustration_114360-4957.jpg"
    ],
    webdev: [
        "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg",
        "https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg",
        "https://img.freepik.com/free-vector/web-development-concept-illustration_114360-2923.jpg"
    ],
    mobile: [
        "https://img.freepik.com/free-vector/app-development-illustration_52683-47931.jpg",
        "https://img.freepik.com/free-vector/mobile-app-development-concept-illustration_114360-7293.jpg",
        "https://img.freepik.com/free-vector/gradient-mobile-development-illustration_52683-81760.jpg"
    ],
    data: [
        "https://img.freepik.com/free-vector/big-data-analytics-abstract-concept-illustration_335657-2137.jpg",
        "https://img.freepik.com/free-vector/data-extraction-concept-illustration_114360-4876.jpg",
        "https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-8112.jpg"
    ],
    ai: [
        "https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-7135.jpg",
        "https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-1164.jpg",
        "https://img.freepik.com/free-vector/machine-learning-concept-illustration_114360-3207.jpg"
    ],
    business: [
        "https://img.freepik.com/free-vector/business-planning-concept-illustration_114360-1675.jpg",
        "https://img.freepik.com/free-vector/digital-marketing-team-with-laptops-light-bulb-marketing-team-metrics-marketing-team-lead-responsibilities-concept_335657-258.jpg",
        "https://img.freepik.com/free-vector/strategic-consulting-concept-illustration_114360-8994.jpg"
    ]
};

function getRelevantImage(courseTitle, courseTopics) {
    // Convert title and topics to lowercase for easier matching
    const titleLower = courseTitle.toLowerCase();
    const topicsLower = courseTopics.map(topic => topic.toLowerCase());

    // Define matching rules
    const matchRules = [
        { keywords: ['react', 'frontend', 'web development'], category: 'webdev' },
        { keywords: ['ui', 'ux', 'design', 'graphic'], category: 'design' },
        { keywords: ['mobile', 'ios', 'android', 'react native'], category: 'mobile' },
        { keywords: ['data', 'algorithm', 'structure', 'database'], category: 'data' },
        { keywords: ['ai', 'machine learning', 'artificial intelligence'], category: 'ai' },
        { keywords: ['business', 'marketing', 'management'], category: 'business' },
        { keywords: ['programming', 'coding', 'development'], category: 'programming' }
    ];

    // Find matching category
    let category = 'programming'; // default category
    for (const rule of matchRules) {
        if (rule.keywords.some(keyword => 
            titleLower.includes(keyword) || 
            topicsLower.some(topic => topic.includes(keyword)))) {
            category = rule.category;
            break;
        }
    }

    // Get random image from the category
    const images = courseImageCategories[category];
    return images[Math.floor(Math.random() * images.length)];
}

// Predefined course templates for different interests and levels
const courseTemplates = {
    design: {
        beginner: [
            {
                title: "Introduction to UI/UX Design",
                description: "Learn the fundamentals of user interface and user experience design. Master the basics of design thinking and modern design tools.",
                duration: 6,
                difficulty: "Beginner",
                keyTopics: ["Design Principles", "Color Theory", "Typography", "Wireframing", "Prototyping"],
                learningOutcomes: ["Create basic UI designs", "Understand user experience principles", "Use design tools effectively"]
            },
            {
                title: "Graphic Design Fundamentals",
                description: "Master the basics of graphic design including composition, layout, and digital design tools.",
                duration: 8,
                difficulty: "Beginner",
                keyTopics: ["Adobe Creative Suite", "Layout Design", "Brand Design", "Digital Graphics"],
                learningOutcomes: ["Create professional graphics", "Design logos and branding materials", "Master design software"]
            }
        ],
        intermediate: [
            {
                title: "Advanced UI Design Patterns",
                description: "Deep dive into complex UI patterns and advanced design systems. Learn to create scalable and consistent designs.",
                duration: 10,
                difficulty: "Intermediate",
                keyTopics: ["Design Systems", "Component Libraries", "Advanced Prototyping", "Design Documentation"],
                learningOutcomes: ["Build complex design systems", "Create advanced prototypes", "Document design decisions"]
            }
        ],
        advanced: [
            {
                title: "Design Leadership and Systems",
                description: "Learn to lead design teams and create enterprise-level design systems. Master advanced design strategy and team management.",
                duration: 12,
                difficulty: "Advanced",
                keyTopics: ["Design Leadership", "Enterprise Design Systems", "Design Strategy", "Team Management"],
                learningOutcomes: ["Lead design teams", "Create enterprise design systems", "Develop design strategies"]
            }
        ]
    },
    programming: {
        beginner: [
            {
                title: "Introduction to Web Development",
                description: "Learn the basics of web development including HTML, CSS, and JavaScript. Build your first responsive websites.",
                duration: 8,
                difficulty: "Beginner",
                keyTopics: ["HTML5", "CSS3", "JavaScript Basics", "Responsive Design"],
                learningOutcomes: ["Build basic websites", "Style web pages", "Add interactivity"]
            }
        ],
        intermediate: [
            {
                title: "Full-Stack JavaScript Development",
                description: "Master both frontend and backend development with JavaScript. Learn popular frameworks and databases.",
                duration: 12,
                difficulty: "Intermediate",
                keyTopics: ["React", "Node.js", "MongoDB", "Express.js"],
                learningOutcomes: ["Build full-stack applications", "Work with databases", "Deploy web apps"]
            }
        ],
        advanced: [
            {
                title: "Advanced Software Architecture",
                description: "Learn advanced software design patterns and architectural principles. Master system design and scalability.",
                duration: 10,
                difficulty: "Advanced",
                keyTopics: ["Design Patterns", "System Architecture", "Scalability", "Performance"],
                learningOutcomes: ["Design complex systems", "Implement design patterns", "Scale applications"]
            }
        ]
    },
    business: {
        beginner: [
            {
                title: "Business Fundamentals",
                description: "Learn the basics of business management and entrepreneurship. Understand key business concepts and strategies.",
                duration: 6,
                difficulty: "Beginner",
                keyTopics: ["Business Planning", "Marketing Basics", "Financial Management", "Operations"],
                learningOutcomes: ["Create business plans", "Understand market analysis", "Manage basic finances"]
            }
        ],
        intermediate: [
            {
                title: "Digital Marketing Strategy",
                description: "Master digital marketing channels and strategies. Learn to create and execute marketing campaigns.",
                duration: 8,
                difficulty: "Intermediate",
                keyTopics: ["Social Media Marketing", "SEO", "Content Marketing", "Analytics"],
                learningOutcomes: ["Create marketing strategies", "Manage campaigns", "Analyze performance"]
            }
        ],
        advanced: [
            {
                title: "Advanced Business Strategy",
                description: "Learn advanced business strategy and leadership. Master corporate strategy and organizational management.",
                duration: 10,
                difficulty: "Advanced",
                keyTopics: ["Corporate Strategy", "Leadership", "Change Management", "Innovation"],
                learningOutcomes: ["Develop business strategies", "Lead organizations", "Drive innovation"]
            }
        ]
    }
};

async function callOpenRouterAPI(userData) {
    console.log("Calling OpenRouter API with data:", userData);
    
    try {
        console.log("Making API request to OpenRouter with model: mistralai/devstral-small:free");
        
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
                'Authorization': 'Bearer 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',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Simplexify Learning Platform'
        },
        body: JSON.stringify({
                model: "mistralai/devstral-small:free",
            messages: [
                {
                    role: "system",
                    content: "You are an expert course advisor who provides detailed, personalized course recommendations. Always return valid JSON."
                },
                {
                    role: "user",
                    content: `Generate 10 unique course recommendations based on these preferences:
                    Main Interest: ${userData.mainInterest}
                    Experience Level: ${userData.experienceLevel}

                    Return the response in this exact JSON format:
                    {
                        "courses": [
                            {
                                "title": "Course Title",
                                "description": "2-3 sentences about the course",
                                "duration": 8,
                                "difficulty": "Beginner/Intermediate/Advanced",
                                "keyTopics": ["topic1", "topic2", "topic3"],
                                "learningOutcomes": ["outcome1", "outcome2", "outcome3"]
                            }
                        ]
                    }

                    Make sure:
                    1. Each course title is unique and specific
                    2. Descriptions are detailed and relevant
                    3. Duration is in weeks (4-12 weeks)
                    4. Key topics are specific to the course (at least 3 topics)
                    5. Learning outcomes are measurable
                    6. Difficulty matches user's level (${userData.experienceLevel})
                    7. All courses relate to ${userData.mainInterest}`
                }
            ]
        })
    });

    if (!response.ok) {
            const errorText = await response.text();
            console.error(`API call failed: ${response.status} ${response.statusText}`, errorText);
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
        console.log("API Response received:", data);
    return data;
    } catch (error) {
        console.error("Error in OpenRouter API call:", error);
        throw error;
    }
}

export async function generateCourseRecommendations(userData) {
    try {
        console.log("Generating recommendations for:", userData);

        const apiResponse = await callOpenRouterAPI(userData);
        
        // Extract and validate the courses from the response
        let courses;
        try {
            const content = apiResponse.choices[0].message.content;
            
            // Sometimes the API might return content with markdown code blocks, let's handle that
            let jsonContent = content;
            if (content.includes("```json")) {
                jsonContent = content.split("```json")[1].split("```")[0].trim();
            } else if (content.includes("```")) {
                jsonContent = content.split("```")[1].split("```")[0].trim();
            }
            
            // Try to parse the JSON
            const parsed = JSON.parse(jsonContent);
            courses = parsed.courses || [];
            
            if (!Array.isArray(courses) || courses.length === 0) {
                console.error("No valid courses in API response:", parsed);
                
                // Fall back to template courses if available
                if (userData.mainInterest && userData.experienceLevel && 
                    courseTemplates[userData.mainInterest.toLowerCase()] && 
                    courseTemplates[userData.mainInterest.toLowerCase()][userData.experienceLevel.toLowerCase()]) {
                    
                    console.log("Falling back to template courses");
                    courses = courseTemplates[userData.mainInterest.toLowerCase()][userData.experienceLevel.toLowerCase()];
                } else {
                    // Use programming beginner as ultimate fallback
                    console.log("Using default fallback courses");
                    courses = courseTemplates.programming.beginner;
                }
            }
        } catch (error) {
            console.error("Error parsing API response:", error, "Response:", apiResponse);
            
            // Fall back to template courses
            if (userData.mainInterest && userData.experienceLevel && 
                courseTemplates[userData.mainInterest.toLowerCase()] && 
                courseTemplates[userData.mainInterest.toLowerCase()][userData.experienceLevel.toLowerCase()]) {
                
                console.log("Falling back to template courses after parse error");
                courses = courseTemplates[userData.mainInterest.toLowerCase()][userData.experienceLevel.toLowerCase()];
            } else {
                // Use programming beginner as ultimate fallback
                console.log("Using default fallback courses after parse error");
                courses = courseTemplates.programming.beginner;
            }
        }

        // Validate and clean each course, and add relevant images
        const validatedCourses = courses.map(course => {
            const cleanedCourse = {
                title: String(course.title || '').trim(),
                description: String(course.description || '').trim(),
                duration: Number(course.duration) || 8,
                difficulty: String(course.difficulty || userData.experienceLevel).trim(),
                keyTopics: Array.isArray(course.keyTopics) ? 
                    course.keyTopics.map(topic => String(topic).trim()) : [],
                learningOutcomes: Array.isArray(course.learningOutcomes) ? 
                    course.learningOutcomes.map(outcome => String(outcome).trim()) : []
            };

            // Add relevant image based on course content
            cleanedCourse.imageUrl = getRelevantImage(
                cleanedCourse.title,
                cleanedCourse.keyTopics
            );

            return cleanedCourse;
        });

        // Remove any duplicates based on title
        const uniqueCourses = validatedCourses.filter((course, index, self) =>
            index === self.findIndex((c) => c.title === course.title)
        );

        // Ensure we have at least some courses, pad with templates if needed
        let finalCourses = uniqueCourses.slice(0, 10);
        
        if (finalCourses.length < 3) {
            console.log("Not enough courses generated, adding fallback courses");
            
            // Add some template courses if we don't have enough
            let additionalCourses = [];
            if (userData.mainInterest && courseTemplates[userData.mainInterest.toLowerCase()]) {
                const levelCourses = courseTemplates[userData.mainInterest.toLowerCase()][userData.experienceLevel.toLowerCase()] || 
                                    courseTemplates[userData.mainInterest.toLowerCase()].beginner;
                additionalCourses = levelCourses || [];
            } else {
                additionalCourses = courseTemplates.programming.beginner;
            }
            
            // Add template courses until we have at least 5 courses
            const existingTitles = finalCourses.map(c => c.title);
            for (const course of additionalCourses) {
                if (!existingTitles.includes(course.title)) {
                    const templateCourse = { ...course };
                    templateCourse.imageUrl = getRelevantImage(
                        templateCourse.title,
                        templateCourse.keyTopics
                    );
                    finalCourses.push(templateCourse);
                    existingTitles.push(templateCourse.title);
                    
                    if (finalCourses.length >= 5) break;
                }
            }
        }

        console.log("Final recommendations:", finalCourses);
        return finalCourses;

    } catch (error) {
        console.error("Error in generateCourseRecommendations:", error);
        // Return some default courses instead of failing completely
        return courseTemplates.programming.beginner.map(course => {
            const templateCourse = { ...course };
            templateCourse.imageUrl = getRelevantImage(
                templateCourse.title,
                templateCourse.keyTopics
            );
            return templateCourse;
        });
    }
}

// Export a dummy function that doesn't actually save to the database
export async function saveCourseRecommendations(userId, courses) {
    // This function now just returns success without saving to database
    console.log("Not saving recommended courses to database as requested.");
        return true;
} 