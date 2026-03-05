// =============================================
// Perpetual Help College of Manila - AI Chatbot
// script.js
// =============================================

(function () {
  "use strict";

  // ===== DOM REFERENCES =====
  const chatForm = document.getElementById("chatForm");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const messagesEl = document.getElementById("messages");
  const chatScroll = document.getElementById("chatScroll");
  const welcomeSection = document.getElementById("welcomeSection");
  const quickActions = document.getElementById("quickActions");

  // ===== PHCM KNOWLEDGE BASE =====
  const KB = {
    school: {
      name: "Perpetual Help College of Manila (PHCM)",
      fullName: "University of Perpetual Help System - Laguna, College of Manila",
      address: "1240 V. Concepcion St., Sampaloc, Manila, Philippines, 1008",
      phone: "0917 325 3147",
      email: "shs.manila@uphsl.edu.ph",
      motto: "Character Building is Nation Building",
    },

    programs: {
      shs: {
        name: "Senior High School (SHS)",
        strands: [
          "Accountancy, Business and Management (ABM)",
          "Humanities and Social Sciences (HUMSS)",
          "Science, Technology, Engineering, and Mathematics (STEM)",
          "General Academic Strand (GAS)",
          "Information and Communications Technology (ICT)",
          "Home Economics (HE)",
        ],
      },
    },

    admission: {
      requirements: [
        "Completed application form",
        "Original and photocopy of Report Card (Form 138)",
        "Certificate of Good Moral Character",
        "PSA Birth Certificate (original and photocopy)",
        "2x2 ID photos (4 pieces)",
        "Certificate of Transfer / Honorable Dismissal (for transferees)",
      ],
      steps: [
        "Visit the Admissions Office or inquire online",
        "Submit the required documents",
        "Take the entrance examination (if applicable)",
        "Attend the interview",
        "Receive your admission results",
        "Complete enrollment and pay fees",
      ],
    },

    tuition: {
      note: "Tuition fees vary depending on the program and strand. PHCM offers competitive and affordable tuition rates. Scholarships and financial assistance programs are also available for qualified students.",
      payment: [
        "Full payment (with discount)",
        "Semestral payment",
        "Monthly installment plan",
      ],
      scholarships: [
        "Academic Scholarship (for honor students)",
        "Athletic Scholarship",
        "UPHSL Scholarship Grants",
        "Government Scholarships (TES, CHED, etc.)",
      ],
    },

    facilities: [
      "Air-conditioned classrooms",
      "Computer laboratories",
      "Science laboratories",
      "Library and resource center",
      "Covered court / gymnasium",
      "Chapel",
      "Student lounge and canteen",
      "Guidance and counseling office",
    ],

    hours: {
      classes: "Monday to Friday, 7:00 AM - 5:00 PM",
      office: "Monday to Friday, 8:00 AM - 5:00 PM",
      saturday: "Saturday: 8:00 AM - 12:00 PM (Admissions Office only)",
    },

    faqs: {
      uniform:
        "PHCM requires students to wear the prescribed school uniform during class days. The uniform can be purchased at the school's bookstore or through authorized suppliers. Details about the uniform will be provided during enrollment.",
      id: "School IDs are issued during the enrollment period. Students must wear their school ID at all times while inside the campus for security purposes.",
      events:
        "PHCM hosts various events throughout the school year, including Foundation Day, Intramurals, Academic Week, Buwan ng Wika, Christmas Celebration, and Graduation Ceremonies. Check with the Student Affairs Office for the latest event schedule.",
      transfer:
        "Transferees are welcome at PHCM! You will need to submit your Honorable Dismissal / Transfer Certificate, Report Card, and other requirements. Visit the Admissions Office for a smooth transfer process.",
    },
  };

  // ===== INTENT DEFINITIONS =====
  // Each intent has an array of keywords and a handler function that returns a response string.
  const intents = [
    {
      keywords: [
        "program", "strand", "course", "offer", "curriculum", "track",
        "abm", "humss", "stem", "gas", "ict", "home economics", "academic",
        "study", "subject", "shs", "senior high",
      ],
      handler: function () {
        var list = KB.programs.shs.strands.map(function (s) { return "  \u2022 " + s; }).join("\n");
        return "PHCM offers the following Senior High School (SHS) strands:\n\n" + list + "\n\nEach strand is designed to prepare students for college or employment. Would you like to know more about the admission process?";
      },
    },
    {
      keywords: [
        "admission", "admit", "apply", "application", "enroll", "enrollment",
        "register", "registration", "requirement", "how to apply", "entrance",
        "exam",
      ],
      handler: function () {
        var reqs = KB.admission.requirements.map(function (r, i) { return "  " + (i + 1) + ". " + r; }).join("\n");
        var steps = KB.admission.steps.map(function (s, i) { return "  " + (i + 1) + ". " + s; }).join("\n");
        return "Here's what you need to know about admission at PHCM:\n\nRequirements:\n" + reqs + "\n\nSteps to Apply:\n" + steps + "\n\nFor more details, contact us at " + KB.school.phone + " or email " + KB.school.email + ".";
      },
    },
    {
      keywords: [
        "tuition", "fee", "cost", "price", "payment", "how much", "afford",
        "scholarship", "financial", "discount", "installment",
      ],
      handler: function () {
        var pay = KB.tuition.payment.map(function (p) { return "  \u2022 " + p; }).join("\n");
        var sch = KB.tuition.scholarships.map(function (s) { return "  \u2022 " + s; }).join("\n");
        return KB.tuition.note + "\n\nPayment Options:\n" + pay + "\n\nScholarship Opportunities:\n" + sch + "\n\nPlease contact the Finance Office or Admissions for the exact tuition breakdown for your chosen strand.";
      },
    },
    {
      keywords: [
        "location", "address", "where", "map", "direction", "campus",
        "sampaloc", "manila", "concepcion",
      ],
      handler: function () {
        return "PHCM is located at:\n\n" + KB.school.address + "\n\nThe campus is in the heart of Sampaloc, Manila, accessible via public transportation. Nearby landmarks include the University Belt area. You can also search \"Perpetual Help College of Manila\" on Google Maps for directions.";
      },
    },
    {
      keywords: [
        "contact", "phone", "email", "call", "reach", "number", "mobile",
        "message", "inquiry", "inquire",
      ],
      handler: function () {
        return "You can reach Perpetual Help College of Manila through:\n\n  \u2022 Phone: " + KB.school.phone + "\n  \u2022 Email: " + KB.school.email + "\n  \u2022 Address: " + KB.school.address + "\n\nFeel free to call or email for inquiries about admissions, enrollment, or any other concerns!";
      },
    },
    {
      keywords: [
        "hour", "time", "schedule", "open", "close", "office", "class time",
        "what time", "operating",
      ],
      handler: function () {
        return "PHCM Operating Hours:\n\n  \u2022 Classes: " + KB.hours.classes + "\n  \u2022 Office Hours: " + KB.hours.office + "\n  \u2022 " + KB.hours.saturday + "\n\nPlease arrive on time and follow the school's attendance policies.";
      },
    },
    {
      keywords: [
        "facility", "facilities", "lab", "library", "gym", "canteen",
        "classroom", "computer", "chapel", "equipment",
      ],
      handler: function () {
        var list = KB.facilities.map(function (f) { return "  \u2022 " + f; }).join("\n");
        return "PHCM provides the following facilities for students:\n\n" + list + "\n\nThe campus is designed to support a well-rounded learning experience for all students.";
      },
    },
    {
      keywords: ["uniform", "dress code", "attire", "clothing"],
      handler: function () { return KB.faqs.uniform; },
    },
    {
      keywords: ["id", "identification", "school id"],
      handler: function () { return KB.faqs.id; },
    },
    {
      keywords: ["event", "activity", "foundation", "intramural", "graduation", "celebration"],
      handler: function () { return KB.faqs.events; },
    },
    {
      keywords: ["transfer", "transferee", "shift", "move school", "honorable dismissal"],
      handler: function () { return KB.faqs.transfer; },
    },
    {
      keywords: [
        "hello", "hi", "hey", "good morning", "good afternoon",
        "good evening", "greetings", "kumusta", "musta", "magandang",
      ],
      handler: function () {
        var greetings = [
          "Hello! Welcome to the Perpetual Help College of Manila Chatbot! How can I help you today?",
          "Hi there! I'm the PHCM virtual assistant. Feel free to ask me anything about our school!",
          "Good day! Welcome to PHCM. I'm here to assist you with information about our programs, admissions, and more!",
          "Hey! Thanks for reaching out to PHCM. What would you like to know?",
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
      },
    },
    {
      keywords: ["thank", "thanks", "salamat", "appreciate", "thank you"],
      handler: function () {
        var responses = [
          "You're welcome! If you have more questions, don't hesitate to ask.",
          "Happy to help! Feel free to reach out anytime.",
          "No problem at all! Let me know if there's anything else I can assist you with.",
          "You're welcome! PHCM is always here to help.",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      },
    },
    {
      keywords: ["bye", "goodbye", "see you", "take care", "paalam"],
      handler: function () {
        var responses = [
          "Goodbye! Thank you for chatting with us. Have a great day!",
          "Take care! Remember, we're always here if you need help. God bless!",
          "See you soon! Don't forget to visit our campus at Sampaloc, Manila!",
          "Bye! Wishing you all the best. Feel free to come back anytime!",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      },
    },
    {
      keywords: [
        "who are you", "what are you", "your name", "chatbot", "bot",
        "what can you do", "help me",
      ],
      handler: function () {
        return "I'm the PHCM Chatbot, your virtual assistant for Perpetual Help College of Manila! I can help you with:\n\n  \u2022 Programs and strands offered\n  \u2022 Admission requirements and process\n  \u2022 Tuition fees and scholarships\n  \u2022 Campus location and contact info\n  \u2022 School facilities and hours\n  \u2022 And more!\n\nJust type your question and I'll do my best to assist you.";
      },
    },
    {
      keywords: ["motto", "vision", "mission", "character building", "nation building"],
      handler: function () {
        return "The motto of Perpetual Help College of Manila is:\n\n\"Character Building is Nation Building\"\n\nThis reflects PHCM's commitment to holistic education \u2014 developing not just academically competent students, but individuals with strong moral character who can contribute positively to the nation.";
      },
    },
    {
      keywords: ["perpetual", "phcm", "uphsl", "about the school", "about phcm"],
      handler: function () {
        return "Perpetual Help College of Manila (PHCM) is part of the University of Perpetual Help System. Located at " + KB.school.address + ", PHCM is dedicated to providing quality education with the motto \"Character Building is Nation Building.\"\n\nThe school offers various Senior High School strands and is committed to the holistic development of its students. For inquiries, you can reach us at " + KB.school.phone + " or " + KB.school.email + ".";
      },
    },
  ];

  // ===== MATCH USER INPUT TO INTENT =====
  function getResponse(userMessage) {
    var lower = userMessage.toLowerCase().trim();

    for (var i = 0; i < intents.length; i++) {
      var intent = intents[i];
      for (var j = 0; j < intent.keywords.length; j++) {
        if (lower.includes(intent.keywords[j])) {
          return intent.handler();
        }
      }
    }

    // Fallback responses
    var fallbacks = [
      "I'm sorry, I don't have information about that yet. You can contact PHCM directly at " + KB.school.phone + " or " + KB.school.email + " for more specific inquiries.",
      "That's a great question! Unfortunately, I don't have that info right now. Please reach out to our Admissions Office at " + KB.school.phone + " for assistance.",
      "I'm not sure about that, but I'd love to help! Try asking about our programs, admission process, tuition, location, or contact details. You can also call us at " + KB.school.phone + ".",
      "Hmm, I couldn't find an answer to that. For official information, please contact us at " + KB.school.email + " or visit our campus at " + KB.school.address + ".",
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // ===== HELPERS =====
  function getTimeString() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function scrollToBottom() {
    requestAnimationFrame(function () {
      chatScroll.scrollTop = chatScroll.scrollHeight;
    });
  }

  // ===== CREATE MESSAGE DOM =====
  function createMessageEl(text, sender) {
    var row = document.createElement("div");
    row.className = "message-row " + sender;

    // Avatar
    var avatar = document.createElement("div");
    avatar.className = "msg-avatar" + (sender === "user" ? " user-av" : "");

    if (sender === "bot") {
      var img = document.createElement("img");
      img.src = "assets/images/phcm-logo.png";
      img.alt = "PHCM Bot";
      avatar.appendChild(img);
    } else {
      avatar.textContent = "You";
    }

    // Content
    var content = document.createElement("div");
    content.className = "msg-content";

    var bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.textContent = text;

    var time = document.createElement("div");
    time.className = "msg-time";
    time.textContent = getTimeString();

    content.appendChild(bubble);
    content.appendChild(time);

    row.appendChild(avatar);
    row.appendChild(content);

    return row;
  }

  // ===== TYPING INDICATOR =====
  function showTyping() {
    var row = document.createElement("div");
    row.className = "typing-row";
    row.id = "typingIndicator";

    var avatar = document.createElement("div");
    avatar.className = "msg-avatar";
    var img = document.createElement("img");
    img.src = "assets/images/phcm-logo.png";
    img.alt = "PHCM Bot typing";
    avatar.appendChild(img);

    var content = document.createElement("div");
    content.className = "msg-content";

    var bubble = document.createElement("div");
    bubble.className = "typing-bubble";
    for (var i = 0; i < 3; i++) {
      var dot = document.createElement("span");
      dot.className = "typing-dot";
      bubble.appendChild(dot);
    }

    content.appendChild(bubble);
    row.appendChild(avatar);
    row.appendChild(content);

    messagesEl.appendChild(row);
    scrollToBottom();
  }

  function removeTyping() {
    var el = document.getElementById("typingIndicator");
    if (el) el.remove();
  }

  // ===== HIDE WELCOME / QUICK ACTIONS =====
  var welcomeHidden = false;

  function hideWelcome() {
    if (welcomeHidden) return;
    welcomeHidden = true;

    welcomeSection.style.transition = "opacity 0.35s ease, transform 0.35s ease";
    welcomeSection.style.opacity = "0";
    welcomeSection.style.transform = "translateY(-12px)";

    setTimeout(function () {
      welcomeSection.classList.add("hidden");
    }, 350);
  }

  // ===== SEND MESSAGE =====
  function sendMessage(text) {
    var message = text || userInput.value.trim();
    if (!message) return;

    // Hide the welcome section
    hideWelcome();

    // Display user message
    messagesEl.appendChild(createMessageEl(message, "user"));

    // Clear input
    userInput.value = "";
    sendBtn.disabled = true;

    scrollToBottom();

    // Show typing indicator
    showTyping();
    scrollToBottom();

    // Simulate thinking delay (600ms - 1400ms)
    var delay = Math.floor(Math.random() * 800) + 600;

    setTimeout(function () {
      removeTyping();

      // Get bot response
      var response = getResponse(message);
      messagesEl.appendChild(createMessageEl(response, "bot"));

      scrollToBottom();
    }, delay);
  }

  // ===== EVENT LISTENERS =====

  // Form submission
  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    sendMessage();
  });

  // Toggle send button
  userInput.addEventListener("input", function () {
    sendBtn.disabled = !this.value.trim();
  });

  // Quick action buttons
  var quickBtns = document.querySelectorAll(".quick-card");
  for (var i = 0; i < quickBtns.length; i++) {
    quickBtns[i].addEventListener("click", function () {
      var question = this.getAttribute("data-question");
      if (question) {
        userInput.value = question;
        sendMessage(question);
      }
    });
  }

  // Allow pressing Enter to send (already handled by form submit)
  // Focus input on desktop
  if (window.innerWidth > 768) {
    userInput.focus();
  }

  // Initial state
  sendBtn.disabled = true;
})();
