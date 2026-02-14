import React, { useState, useEffect } from 'react';
import { Share2, Trophy, Clock, Grid3x3, CheckCircle2, XCircle, Settings, User, BarChart3, LogOut } from 'lucide-react';

// Sample trivia questions database
const triviaDatabase = {
  currentevents: [
    { 
      q: "Who won the 2024 US Presidential Election?", 
      options: ["Kamala Harris", "Donald Trump", "Joe Biden", "Ron DeSantis"], 
      correct: 1,
      explanation: "Donald Trump won the 2024 US Presidential Election, defeating Vice President Kamala Harris. Trump, who previously served as the 45th president from 2017-2021, was inaugurated as the 47th president on January 20, 2025. This made him the second president in US history to serve non-consecutive terms, after Grover Cleveland.",
      wiki: "https://en.wikipedia.org/wiki/2024_United_States_presidential_election"
    },
    { 
      q: "Which country hosted the 2024 Summer Olympics?", 
      options: ["Japan", "France", "United States", "Australia"], 
      correct: 1,
      explanation: "France hosted the 2024 Summer Olympics in Paris from July 26 to August 11, 2024. This was Paris's third time hosting the Summer Olympics, having previously hosted in 1900 and 1924. The Games featured innovative venues, including beach volleyball at the Eiffel Tower and equestrian events at the Palace of Versailles.",
      wiki: "https://en.wikipedia.org/wiki/2024_Summer_Olympics"
    },
    { 
      q: "What major tech company announced massive AI investments in 2024?", 
      options: ["Microsoft", "Apple", "Google", "All of the above"], 
      correct: 3,
      explanation: "All major tech companies announced significant AI investments in 2024. Microsoft deepened its partnership with OpenAI, Apple launched Apple Intelligence, and Google expanded its AI offerings with Gemini. The year 2024 was marked by an 'AI arms race' as companies competed to integrate generative AI into their products.",
      wiki: "https://en.wikipedia.org/wiki/Artificial_intelligence"
    },
    { 
      q: "Which global health organization declared mpox a public health emergency in 2024?", 
      options: ["CDC", "WHO", "FDA", "NHS"], 
      correct: 1,
      explanation: "The World Health Organization (WHO) declared mpox (formerly known as monkeypox) a public health emergency of international concern in 2024 due to a new, more transmissible strain spreading in Africa. This marked the second time mpox received this designation, highlighting ongoing global health surveillance efforts.",
      wiki: "https://en.wikipedia.org/wiki/Mpox"
    },
    { 
      q: "What major climate agreement milestone occurred in 2024?", 
      options: ["Paris Agreement 10 years", "First loss and damage fund", "Net zero by 2030", "Carbon tax worldwide"], 
      correct: 1,
      explanation: "In 2024, the first 'loss and damage' fund became operational, representing a historic milestone in climate justice. This fund, agreed upon at COP28, provides financial assistance to developing nations suffering from climate change impacts. It acknowledges that wealthy nations bear responsibility for helping vulnerable countries cope with climate disasters.",
      wiki: "https://en.wikipedia.org/wiki/United_Nations_Climate_Change_conference"
    },
  ],
  geography: [
    { 
      q: "What is the capital of Australia?", 
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], 
      correct: 2,
      explanation: "Canberra is Australia's capital city, chosen in 1908 as a compromise between rivals Sydney and Melbourne. Located inland in the Australian Capital Territory, Canberra was purpose-built as the capital and houses Parliament House, the High Court, and many national institutions. It has a population of about 460,000 people.",
      wiki: "https://en.wikipedia.org/wiki/Canberra"
    },
    { 
      q: "Which is the longest river in the world?", 
      options: ["Amazon", "Nile", "Yangtze", "Mississippi"], 
      correct: 1,
      explanation: "The Nile River is generally considered the world's longest river at approximately 6,650 kilometers (4,130 miles). It flows through northeastern Africa, primarily Egypt and Sudan. The Nile has been crucial to Egyptian civilization for thousands of years, providing water, transportation, and fertile soil. Some measurements suggest the Amazon might be slightly longer.",
      wiki: "https://en.wikipedia.org/wiki/Nile"
    },
    { 
      q: "How many countries are in Africa?", 
      options: ["48", "52", "54", "58"], 
      correct: 2,
      explanation: "Africa has 54 recognized sovereign states (countries). It's the world's second-largest continent by both area and population, with over 1.3 billion people. The continent is incredibly diverse, with thousands of languages spoken and a rich cultural heritage. South Sudan, which gained independence in 2011, is Africa's newest country.",
      wiki: "https://en.wikipedia.org/wiki/Africa"
    },
    { 
      q: "What is the smallest country in the world?", 
      options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], 
      correct: 1,
      explanation: "Vatican City is the world's smallest country at just 0.44 square kilometers (0.17 square miles). Located within Rome, Italy, it's the spiritual and administrative center of the Roman Catholic Church. With a population of about 800, it has its own postal system, radio station, and Swiss Guard security force.",
      wiki: "https://en.wikipedia.org/wiki/Vatican_City"
    },
    { 
      q: "Which ocean is the largest?", 
      options: ["Atlantic", "Indian", "Arctic", "Pacific"], 
      correct: 3,
      explanation: "The Pacific Ocean is the largest and deepest ocean, covering about 46% of Earth's water surface and about one-third of its total surface area. It's larger than all of Earth's land area combined. The Pacific contains the Mariana Trench, the deepest point on Earth at about 11,000 meters (36,000 feet) below sea level.",
      wiki: "https://en.wikipedia.org/wiki/Pacific_Ocean"
    },
  ],
  history: [
    { 
      q: "In what year did World War II end?", 
      options: ["1943", "1944", "1945", "1946"], 
      correct: 2,
      explanation: "World War II ended in 1945 with Germany's surrender in May and Japan's surrender in September after the atomic bombings of Hiroshima and Nagasaki. The war lasted six years and involved most of the world's nations, resulting in an estimated 70-85 million deaths, making it the deadliest conflict in human history.",
      wiki: "https://en.wikipedia.org/wiki/World_War_II"
    },
    { 
      q: "Who was the first President of the United States?", 
      options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"], 
      correct: 1,
      explanation: "George Washington served as the first President of the United States from 1789 to 1797. A Revolutionary War hero and Founding Father, he set many precedents for the office, including the two-term tradition. His leadership helped establish the new nation's government and he's often called the 'Father of His Country.'",
      wiki: "https://en.wikipedia.org/wiki/George_Washington"
    },
    { 
      q: "What ancient wonder was located in Alexandria?", 
      options: ["Hanging Gardens", "Colossus", "Lighthouse", "Statue of Zeus"], 
      correct: 2,
      explanation: "The Lighthouse of Alexandria (Pharos) was one of the Seven Wonders of the Ancient World. Built around 280 BCE, it stood over 100 meters tall and guided ships into Alexandria's harbor for centuries. It was one of the tallest man-made structures for many centuries and remained functional until it was damaged by earthquakes.",
      wiki: "https://en.wikipedia.org/wiki/Lighthouse_of_Alexandria"
    },
    { 
      q: "Which empire built Machu Picchu?", 
      options: ["Aztec", "Maya", "Inca", "Olmec"], 
      correct: 2,
      explanation: "Machu Picchu was built by the Inca Empire in the 15th century, around 1450 CE, during the reign of Inca emperor Pachacuti. This 'Lost City of the Incas' sits at 2,430 meters above sea level in the Andes Mountains of Peru. It was abandoned during the Spanish Conquest and remained unknown to the outside world until 1911.",
      wiki: "https://en.wikipedia.org/wiki/Machu_Picchu"
    },
    { 
      q: "What year did the Berlin Wall fall?", 
      options: ["1987", "1989", "1991", "1993"], 
      correct: 1,
      explanation: "The Berlin Wall fell on November 9, 1989, marking a pivotal moment in world history and the beginning of the end of the Cold War. The wall had divided East and West Berlin since 1961. Its fall led to German reunification in 1990 and symbolized the collapse of communist control in Eastern Europe.",
      wiki: "https://en.wikipedia.org/wiki/Berlin_Wall"
    },
  ],
  movies: [
    { 
      q: "Who directed 'The Godfather'?", 
      options: ["Martin Scorsese", "Francis Ford Coppola", "Steven Spielberg", "Stanley Kubrick"], 
      correct: 1,
      explanation: "Francis Ford Coppola directed The Godfather (1972), which is widely regarded as one of the greatest films ever made. Based on Mario Puzo's novel, the film tells the story of the Corleone crime family and won three Academy Awards, including Best Picture. Coppola also directed its acclaimed sequels.",
      wiki: "https://en.wikipedia.org/wiki/The_Godfather"
    },
    { 
      q: "What year was 'Jurassic Park' released?", 
      options: ["1991", "1993", "1995", "1997"], 
      correct: 1,
      explanation: "Jurassic Park was released in 1993, directed by Steven Spielberg and based on Michael Crichton's novel. The film revolutionized special effects by combining CGI with animatronics to bring dinosaurs to life. It became the highest-grossing film ever at the time and spawned a massive franchise that continues today.",
      wiki: "https://en.wikipedia.org/wiki/Jurassic_Park_(film)"
    },
    { 
      q: "Which TV show featured the fictional Dunder Mifflin Paper Company?", 
      options: ["Parks and Recreation", "The Office", "30 Rock", "Arrested Development"], 
      correct: 1,
      explanation: "The Office (US version, 2005-2013) was set at Dunder Mifflin Paper Company in Scranton, Pennsylvania. The mockumentary-style sitcom became a cultural phenomenon, launching the careers of stars like Steve Carell, John Krasinski, and Mindy Kaling. It's one of the most-streamed shows of all time.",
      wiki: "https://en.wikipedia.org/wiki/The_Office_(American_TV_series)"
    },
    { 
      q: "Who played Iron Man in the MCU?", 
      options: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"], 
      correct: 1,
      explanation: "Robert Downey Jr. portrayed Tony Stark/Iron Man across the Marvel Cinematic Universe, beginning with Iron Man (2008) and appearing in 10 films total. His charismatic performance helped launch the MCU into the most successful film franchise of all time. His final appearance in Avengers: Endgame (2019) was an emotional farewell.",
      wiki: "https://en.wikipedia.org/wiki/Iron_Man"
    },
    { 
      q: "What is the highest-grossing film of all time?", 
      options: ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars"], 
      correct: 1,
      explanation: "Avatar (2009), directed by James Cameron, is the highest-grossing film of all time with over $2.9 billion worldwide. The sci-fi epic revolutionized 3D filmmaking and motion-capture technology. While Avengers: Endgame briefly held the record, Avatar reclaimed the title after a 2021 re-release in China.",
      wiki: "https://en.wikipedia.org/wiki/Avatar_(2009_film)"
    },
  ],
  music: [
    { 
      q: "Which band is known as 'The Fab Four'?", 
      options: ["The Rolling Stones", "The Beatles", "The Who", "Led Zeppelin"], 
      correct: 1,
      explanation: "The Beatles, nicknamed 'The Fab Four,' revolutionized popular music in the 1960s. John Lennon, Paul McCartney, George Harrison, and Ringo Starr created timeless albums like 'Sgt. Pepper's Lonely Hearts Club Band' and 'Abbey Road.' They're the best-selling music artists of all time with over 600 million records sold worldwide.",
      wiki: "https://en.wikipedia.org/wiki/The_Beatles"
    },
    { 
      q: "What instrument is Yo-Yo Ma famous for playing?", 
      options: ["Violin", "Piano", "Cello", "Flute"], 
      correct: 2,
      explanation: "Yo-Yo Ma is one of the world's most celebrated cellists. The French-born American musician has won 19 Grammy Awards and performed for eight American presidents. He's known for his virtuosity, genre-crossing collaborations, and the Silk Road Project, which explores musical traditions along the historic trade route.",
      wiki: "https://en.wikipedia.org/wiki/Yo-Yo_Ma"
    },
    { 
      q: "Which music festival takes place annually in the California desert?", 
      options: ["Lollapalooza", "Bonnaroo", "Coachella", "Glastonbury"], 
      correct: 2,
      explanation: "Coachella Valley Music and Arts Festival, commonly known as Coachella, takes place annually in Indio, California. Founded in 1999, it's one of the largest and most famous music festivals in the world, featuring diverse genres and becoming a major cultural event. It typically happens over two weekends each April.",
      wiki: "https://en.wikipedia.org/wiki/Coachella_Valley_Music_and_Arts_Festival"
    },
    { 
      q: "What genre of music originated in Jamaica in the late 1960s?", 
      options: ["Reggae", "Ska", "Calypso", "Soca"], 
      correct: 0,
      explanation: "Reggae music originated in Jamaica in the late 1960s, evolving from ska and rocksteady. Bob Marley became its most famous ambassador, spreading reggae worldwide. The genre is characterized by its distinctive rhythm, socially conscious lyrics, and association with Rastafarian culture. In 2018, UNESCO added reggae to its list of intangible cultural heritage.",
      wiki: "https://en.wikipedia.org/wiki/Reggae"
    },
    { 
      q: "Which classical composer was deaf when he composed his Ninth Symphony?", 
      options: ["Mozart", "Beethoven", "Bach", "Chopin"], 
      correct: 1,
      explanation: "Ludwig van Beethoven was almost completely deaf when he composed his Ninth Symphony in 1824. This masterpiece includes the famous 'Ode to Joy' chorus and is considered one of the greatest achievements in Western classical music. Despite his profound hearing loss, Beethoven continued composing by feeling vibrations and using his inner musical imagination.",
      wiki: "https://en.wikipedia.org/wiki/Ludwig_van_Beethoven"
    },
  ],
  popculture: [
    { 
      q: "Which artist has won the most Grammy Awards of all time?", 
      options: ["Beyoncé", "Quincy Jones", "Taylor Swift", "Kanye West"], 
      correct: 0,
      explanation: "Beyoncé holds the record for most Grammy wins by any artist with 32 awards as of 2023. She surpassed conductor Georg Solti's previous record of 31 Grammys. Her wins span multiple categories including R&B, pop, and music video. She's also the most-nominated artist in Grammy history with 88 nominations.",
      wiki: "https://en.wikipedia.org/wiki/Beyonc%C3%A9"
    },
    { 
      q: "What streaming show became Netflix's most-watched series ever?", 
      options: ["Stranger Things", "Squid Game", "Wednesday", "The Witcher"], 
      correct: 1,
      explanation: "Squid Game, the South Korean survival drama, became Netflix's most-watched series when it premiered in 2021. Over 1.65 billion hours were viewed in the first 28 days. The show's dystopian take on children's games resonated globally, sparking countless memes and Halloween costumes. It proved non-English content could dominate worldwide.",
      wiki: "https://en.wikipedia.org/wiki/Squid_Game"
    },
    { 
      q: "Who is known as the 'King of Pop'?", 
      options: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"], 
      correct: 1,
      explanation: "Michael Jackson earned the title 'King of Pop' through his revolutionary music, dance moves, and music videos. His 1982 album 'Thriller' remains the best-selling album of all time. His moonwalk, signature glove, and iconic performances transformed pop culture. He won 13 Grammy Awards and influenced countless artists across genres.",
      wiki: "https://en.wikipedia.org/wiki/Michael_Jackson"
    },
    { 
      q: "Which social media platform was originally called 'Twitter'?", 
      options: ["Threads", "Bluesky", "X", "Mastodon"], 
      correct: 2,
      explanation: "Twitter was rebranded to 'X' in 2023 after Elon Musk's acquisition of the platform. The bird logo was replaced with a stylized X, and the company underwent significant changes. Twitter had been a major social media platform since 2006, known for its 280-character posts (originally 140) and real-time conversations.",
      wiki: "https://en.wikipedia.org/wiki/Twitter"
    },
    { 
      q: "What year did the first iPhone release?", 
      options: ["2005", "2007", "2009", "2011"], 
      correct: 1,
      explanation: "The first iPhone was released on June 29, 2007, revolutionizing the smartphone industry. Steve Jobs unveiled it earlier that year with the famous line 'an iPod, a phone, and an internet communicator.' It featured a 3.5-inch touchscreen, no physical keyboard, and introduced the App Store concept that transformed mobile computing.",
      wiki: "https://en.wikipedia.org/wiki/IPhone_(1st_generation)"
    },
  ],
  science: [
    { 
      q: "What is the largest planet in our solar system?", 
      options: ["Jupiter", "Saturn", "Neptune", "Earth"], 
      correct: 0,
      explanation: "Jupiter is the largest planet in our solar system with a mass more than twice that of all other planets combined. It's a gas giant with a distinctive Great Red Spot - a massive storm that has been raging for hundreds of years. Jupiter has at least 95 known moons, including the four large Galilean moons discovered by Galileo in 1610.",
      wiki: "https://en.wikipedia.org/wiki/Jupiter"
    },
    { 
      q: "What is the chemical symbol for gold?", 
      options: ["Go", "Gd", "Au", "Ag"], 
      correct: 2,
      explanation: "Gold's chemical symbol 'Au' comes from the Latin word 'aurum,' meaning 'shining dawn.' Gold is one of the least reactive chemical elements and has been valued throughout human history for its rarity, beauty, and resistance to corrosion. It's used in jewelry, electronics, and even in space exploration.",
      wiki: "https://en.wikipedia.org/wiki/Gold"
    },
    { 
      q: "How many bones are in the human body?", 
      options: ["186", "206", "226", "246"], 
      correct: 1,
      explanation: "An adult human has 206 bones, though babies are born with about 270 bones. Many of these fuse together as we grow, particularly in the skull and spine. Bones provide structure, protect organs, anchor muscles, and store calcium. The smallest bone is the stapes in the ear, and the largest is the femur (thighbone).",
      wiki: "https://en.wikipedia.org/wiki/Human_skeleton"
    },
    { 
      q: "What gas do plants absorb from the atmosphere?", 
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], 
      correct: 2,
      explanation: "Plants absorb carbon dioxide (CO₂) during photosynthesis, using sunlight to convert it into glucose and oxygen. This process is crucial for life on Earth - plants remove CO₂ from the atmosphere while producing the oxygen we breathe. A single tree can absorb up to 48 pounds of CO₂ per year.",
      wiki: "https://en.wikipedia.org/wiki/Photosynthesis"
    },
    { 
      q: "What is the speed of light?", 
      options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"], 
      correct: 0,
      explanation: "The speed of light in a vacuum is approximately 299,792 kilometers per second (or about 186,282 miles per second). This is the universe's ultimate speed limit - nothing can travel faster. Light from the Sun takes about 8 minutes to reach Earth, and this constant is fundamental to Einstein's theory of relativity.",
      wiki: "https://en.wikipedia.org/wiki/Speed_of_light"
    },
  ],
  sports: [
    { 
      q: "How many players are on a basketball team on the court?", 
      options: ["4", "5", "6", "7"], 
      correct: 1,
      explanation: "Basketball teams have 5 players on the court at a time for each team. The typical positions are point guard, shooting guard, small forward, power forward, and center. The sport was invented by James Naismith in 1891 in Springfield, Massachusetts as an indoor game for the winter months.",
      wiki: "https://en.wikipedia.org/wiki/Basketball"
    },
    { 
      q: "Which country won the 2018 FIFA World Cup?", 
      options: ["Brazil", "Germany", "France", "Argentina"], 
      correct: 2,
      explanation: "France won the 2018 FIFA World Cup held in Russia, defeating Croatia 4-2 in the final. This was France's second World Cup victory (after 1998). Young star Kylian Mbappé became only the second teenager to score in a World Cup final, and the tournament featured some of the most exciting matches in recent World Cup history.",
      wiki: "https://en.wikipedia.org/wiki/2018_FIFA_World_Cup"
    },
    { 
      q: "What is a perfect score in bowling?", 
      options: ["200", "250", "300", "350"], 
      correct: 2,
      explanation: "A perfect game in bowling is 300 points, achieved by bowling 12 consecutive strikes (one strike in each of the 10 frames, plus two bonus strikes in the 10th frame). The first perfect game was recorded in 1902. Professional bowlers can achieve this feat, but it remains rare even among experienced players.",
      wiki: "https://en.wikipedia.org/wiki/Perfect_game_(bowling)"
    },
    { 
      q: "How many Grand Slam tennis tournaments are there?", 
      options: ["3", "4", "5", "6"], 
      correct: 1,
      explanation: "There are four Grand Slam tournaments: the Australian Open, French Open, Wimbledon, and US Open. These are the most prestigious tennis events, held annually in Australia, France, England, and the United States respectively. Winning all four in a single year is called the 'Calendar Year Grand Slam,' an extremely rare achievement.",
      wiki: "https://en.wikipedia.org/wiki/Grand_Slam_(tennis)"
    },
    { 
      q: "What sport is known as 'the beautiful game'?", 
      options: ["Basketball", "Football/Soccer", "Tennis", "Baseball"], 
      correct: 1,
      explanation: "Football (soccer) is known as 'the beautiful game,' a phrase popularized by Brazilian legend Pelé. The sport is the world's most popular, played by over 250 million players in over 200 countries. Its simplicity, requiring only a ball, combined with its grace and tactical complexity, has earned it this poetic nickname.",
      wiki: "https://en.wikipedia.org/wiki/Association_football"
    },
  ],
};

// Category display names with emojis
const categoryNames = {
  currentevents: "📰 Current Events",
  geography: "🌍 Geography",
  history: "📜 History",
  movies: "🎬 Movies & TV",
  music: "🎵 Music",
  popculture: "⭐ Pop Culture",
  science: "🔬 Science",
  sports: "🏆 Sports"
};

// Function to generate daily questions based on date
const getDailyQuestions = (date) => {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const allQuestions = Object.values(triviaDatabase).flat();
  
  // Pseudo-random shuffle based on date
  const shuffled = [...allQuestions].sort((a, b) => {
    const hashA = (seed + allQuestions.indexOf(a)) * 2654435761;
    const hashB = (seed + allQuestions.indexOf(b)) * 2654435761;
    return hashA - hashB;
  });
  
  return shuffled.slice(0, 10);
};

export default function TriviaApp() {
  const [screen, setScreen] = useState('home');
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [authStep, setAuthStep] = useState('credentials'); // 'credentials' or 'verification'
  const [verificationCode, setVerificationCode] = useState('');
  const [tempAuthData, setTempAuthData] = useState(null);
  const [userStats, setUserStats] = useState({
    overall: { correct: 0, total: 0 },
    daily: { correct: 0, total: 0 },
    bestDailyScore: 0,
    bestStreak: 0,
    currentevents: { correct: 0, total: 0 },
    geography: { correct: 0, total: 0 },
    history: { correct: 0, total: 0 },
    movies: { correct: 0, total: 0 },
    music: { correct: 0, total: 0 },
    popculture: { correct: 0, total: 0 },
    science: { correct: 0, total: 0 },
    sports: { correct: 0, total: 0 }
  });
  const [lastDailyDate, setLastDailyDate] = useState(null);
  const [hasPlayedToday, setHasPlayedToday] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);

  // Achievement definitions
  const achievementTiers = [
    { id: 'streak_5', name: '5 Streak Master', icon: '🔥', requirement: 5, description: 'Get 5 correct answers in a row' },
    { id: 'streak_10', name: '10 Streak Legend', icon: '⚡', requirement: 10, description: 'Get 10 correct answers in a row' },
    { id: 'streak_15', name: '15 Streak Champion', icon: '🌟', requirement: 15, description: 'Get 15 correct answers in a row' },
    { id: 'streak_20', name: '20 Streak Genius', icon: '💎', requirement: 20, description: 'Get 20 correct answers in a row' },
    { id: 'streak_25', name: '25 Streak Unstoppable', icon: '👑', requirement: 25, description: 'Get 25 correct answers in a row' },
    { id: 'streak_50', name: '50 Streak Legendary', icon: '🏆', requirement: 50, description: 'Get 50 correct answers in a row' }
  ];

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await window.storage.get('trivjam_user');
        if (userData) {
          const user = JSON.parse(userData.value);
          setIsLoggedIn(true);
          setUsername(user.username);
          
          // Load stats
          const statsData = await window.storage.get(`trivjam_stats_${user.username}`);
          if (statsData) {
            const loadedStats = JSON.parse(statsData.value);
            // Add default values for new fields if they don't exist
            if (!loadedStats.hasOwnProperty('bestDailyScore')) {
              loadedStats.bestDailyScore = 0;
            }
            if (!loadedStats.hasOwnProperty('bestStreak')) {
              loadedStats.bestStreak = 0;
            }
            setUserStats(loadedStats);
          }
          
          // Load achievements
          const achievementsData = await window.storage.get(`trivjam_achievements_${user.username}`);
          if (achievementsData) {
            setAchievements(JSON.parse(achievementsData.value));
          }
          
          // Check if user has played today
          const dailyData = await window.storage.get(`trivjam_daily_${user.username}`);
          if (dailyData) {
            const { date } = JSON.parse(dailyData.value);
            const today = new Date().toDateString();
            setLastDailyDate(date);
            setHasPlayedToday(date === today);
          }
        }
      } catch (error) {
        // User not logged in or no data
        console.log('No user data found');
      }
    };
    loadUserData();
  }, []);

  // Check and unlock achievement
  const checkAchievement = async (streak) => {
    if (!isLoggedIn) return;
    
    // Update best streak if current streak is higher
    if (streak > userStats.bestStreak) {
      const newStats = { ...userStats, bestStreak: streak };
      setUserStats(newStats);
      
      try {
        await window.storage.set(`trivjam_stats_${username}`, JSON.stringify(newStats));
      } catch (error) {
        console.error('Error saving best streak:', error);
      }
    }
    
    const unlockedAchievement = achievementTiers.find(
      tier => tier.requirement === streak && !achievements.includes(tier.id)
    );
    
    if (unlockedAchievement) {
      const newAchievements = [...achievements, unlockedAchievement.id];
      setAchievements(newAchievements);
      setShowAchievement(unlockedAchievement);
      
      try {
        await window.storage.set(`trivjam_achievements_${username}`, JSON.stringify(newAchievements));
      } catch (error) {
        console.error('Error saving achievements:', error);
      }
      
      // Hide achievement notification after 5 seconds
      setTimeout(() => setShowAchievement(null), 5000);
    }
  };

  // Handle login - step 1: credentials
  const handleLoginCredentials = async (emailOrPhone, password) => {
    if (!emailOrPhone.trim() || !password.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    try {
      // Check if account exists
      const accountKey = `trivjam_account_${emailOrPhone}`;
      const existingUser = await window.storage.get(accountKey);
      
      if (!existingUser) {
        alert('Account not found. Please sign up first!');
        return;
      }
      
      const account = JSON.parse(existingUser.value);
      
      // Check password
      if (account.password !== password) {
        alert('Incorrect password');
        return;
      }
      
      // Generate verification code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCode(code);
      setTempAuthData({ emailOrPhone, username: account.username });
      setAuthStep('verification');
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Handle signup - step 1: credentials
  const handleSignupCredentials = async (emailOrPhone, password, username) => {
    if (!emailOrPhone.trim() || !password.trim() || !username.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    // Basic validation
    const isEmail = emailOrPhone.includes('@');
    const isPhone = /^\+?[\d\s-()]+$/.test(emailOrPhone);
    
    if (!isEmail && !isPhone) {
      alert('Please enter a valid email or phone number');
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    
    try {
      // Check if account already exists
      const accountKey = `trivjam_account_${emailOrPhone}`;
      const existingUser = await window.storage.get(accountKey);
      
      if (existingUser) {
        alert('An account with this email/phone already exists. Please log in!');
        return;
      }
      
      // Generate verification code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCode(code);
      setTempAuthData({ emailOrPhone, password, username });
      setAuthStep('verification');
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Handle verification code
  const handleVerification = async (enteredCode) => {
    if (enteredCode !== verificationCode) {
      alert('Invalid verification code. Please try again.');
      return;
    }
    
    try {
      if (authMode === 'signup') {
        // Create new account
        const accountKey = `trivjam_account_${tempAuthData.emailOrPhone}`;
        await window.storage.set(accountKey, JSON.stringify({
          emailOrPhone: tempAuthData.emailOrPhone,
          password: tempAuthData.password,
          username: tempAuthData.username,
          createdAt: new Date().toISOString()
        }));
        
        // Initialize stats
        const initialStats = {
          overall: { correct: 0, total: 0 },
          daily: { correct: 0, total: 0 },
          bestDailyScore: 0,
          bestStreak: 0,
          currentevents: { correct: 0, total: 0 },
          geography: { correct: 0, total: 0 },
          history: { correct: 0, total: 0 },
          movies: { correct: 0, total: 0 },
          music: { correct: 0, total: 0 },
          popculture: { correct: 0, total: 0 },
          science: { correct: 0, total: 0 },
          sports: { correct: 0, total: 0 }
        };
        await window.storage.set(`trivjam_stats_${tempAuthData.username}`, JSON.stringify(initialStats));
        
        // Save current user session
        await window.storage.set('trivjam_user', JSON.stringify({ 
          username: tempAuthData.username,
          emailOrPhone: tempAuthData.emailOrPhone 
        }));
        
        setIsLoggedIn(true);
        setUsername(tempAuthData.username);
        setUserStats(initialStats);
      } else {
        // Login existing user
        await window.storage.set('trivjam_user', JSON.stringify({ 
          username: tempAuthData.username,
          emailOrPhone: tempAuthData.emailOrPhone 
        }));
        
        setIsLoggedIn(true);
        setUsername(tempAuthData.username);
        
        // Load user stats
        const statsData = await window.storage.get(`trivjam_stats_${tempAuthData.username}`);
        if (statsData) {
          setUserStats(JSON.parse(statsData.value));
        }
      }
      
      // Reset auth state
      setShowAuth(false);
      setAuthStep('credentials');
      setVerificationCode('');
      setTempAuthData(null);
    } catch (error) {
      console.error('Verification error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await window.storage.delete('trivjam_user');
      setIsLoggedIn(false);
      setUsername('');
      setUserStats({
        overall: { correct: 0, total: 0 },
        daily: { correct: 0, total: 0 },
        bestDailyScore: 0,
        bestStreak: 0,
        currentevents: { correct: 0, total: 0 },
        geography: { correct: 0, total: 0 },
        history: { correct: 0, total: 0 },
        movies: { correct: 0, total: 0 },
        music: { correct: 0, total: 0 },
        popculture: { correct: 0, total: 0 },
        science: { correct: 0, total: 0 },
        sports: { correct: 0, total: 0 }
      });
      setLastDailyDate(null);
      setHasPlayedToday(false);
      setAchievements([]);
      setCurrentStreak(0);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Update stats after game
  const updateStats = async (gameAnswers, category) => {
    if (!isLoggedIn) return;
    
    const correct = gameAnswers.filter(a => a).length;
    const total = gameAnswers.length;
    
    const newStats = { ...userStats };
    newStats.overall.correct += correct;
    newStats.overall.total += total;
    
    if (category === 'daily') {
      // Update daily challenge stats
      newStats.daily.correct += correct;
      newStats.daily.total += total;
      
      // Update best daily score if this score is higher
      if (correct > newStats.bestDailyScore) {
        newStats.bestDailyScore = correct;
      }
      
      // Mark that user has played today
      const today = new Date().toDateString();
      setLastDailyDate(today);
      setHasPlayedToday(true);
      
      try {
        await window.storage.set(`trivjam_daily_${username}`, JSON.stringify({
          date: today,
          score: correct,
          total: total
        }));
      } catch (error) {
        console.error('Error saving daily challenge data:', error);
      }
    } else if (category && category !== 'daily') {
      newStats[category].correct += correct;
      newStats[category].total += total;
    }
    
    setUserStats(newStats);
    
    try {
      await window.storage.set(`trivjam_stats_${username}`, JSON.stringify(newStats));
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  };

  // Generate trivia questions using Claude API
  const generateQuestions = async (category, count = 5) => {
    let categoryPrompt;
    
    if (category === 'mixed') {
      categoryPrompt = 'mixed topics across science, history, geography, pop culture, sports, music, movies/TV, and current events';
    } else {
      const categoryName = categoryNames[category].replace(/[^\w\s]/g, '').trim();
      categoryPrompt = `the category "${categoryName}"`;
    }
    
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { 
              role: "user", 
              content: `Generate ${count} trivia questions for ${categoryPrompt}. Return ONLY a valid JSON array with no markdown formatting, backticks, or preamble. Each question must have this exact structure:
{
  "q": "question text",
  "options": ["option1", "option2", "option3", "option4"],
  "correct": 0,
  "explanation": "detailed explanation (2-3 sentences)",
  "wiki": "https://en.wikipedia.org/wiki/Topic"
}

Requirements:
- Make questions interesting and varied in difficulty
- Ensure correct answer index (0-3) is accurate
- Provide engaging explanations with context
- Include real Wikipedia URLs for the topic
- Mix easy, medium, and hard questions
- Return ONLY the JSON array, nothing else` 
            }
          ],
        })
      });

      const data = await response.json();
      const text = data.content.find(item => item.type === "text")?.text || "";
      
      // Clean any markdown formatting
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const questions = JSON.parse(cleanText);
      
      return questions;
    } catch (error) {
      console.error('Error generating questions:', error);
      // Fallback to existing questions if generation fails
      if (category === 'mixed') {
        const today = new Date();
        return getDailyQuestions(today);
      }
      return triviaDatabase[category] || [];
    }
  };

  const startDailyChallenge = () => {
    // Check if logged in user has already played today
    if (isLoggedIn && hasPlayedToday) {
      alert('You\'ve already completed today\'s challenge! Come back tomorrow for a new one. 🎯');
      return;
    }
    
    const today = new Date();
    const questions = getDailyQuestions(today);
    setCurrentQuestions(questions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowExplanation(false);
    setGameMode('daily');
    setScreen('game');
  };

  const startCategoryGame = async (category) => {
    // Show loading state
    setScreen('loading');
    
    // Reset streak for new game
    setCurrentStreak(0);
    
    // Generate fresh questions
    const questions = await generateQuestions(category, 5);
    
    setCurrentQuestions(questions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowExplanation(false);
    setGameMode(category);
    setScreen('game');
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowFeedback(true);
    const isCorrect = selectedAnswer === currentQuestions[currentQuestionIndex].correct;
    setUserAnswers([...userAnswers, isCorrect]);
    
    // Update streak for category games
    if (gameMode !== 'daily') {
      if (isCorrect) {
        const newStreak = currentStreak + 1;
        setCurrentStreak(newStreak);
        checkAchievement(newStreak);
      } else {
        setCurrentStreak(0);
      }
    }
  };

  const nextQuestion = async () => {
    if (gameMode === 'daily') {
      // Daily challenge has fixed number of questions
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShowExplanation(false);
      } else {
        // Game is ending, update stats if logged in
        updateStats(userAnswers, gameMode);
        setScreen('results');
      }
    } else {
      // Category games are endless
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShowExplanation(false);
      } else {
        // Generate more questions
        setShowFeedback(false);
        setShowExplanation(false);
        const moreQuestions = await generateQuestions(gameMode, 5);
        setCurrentQuestions([...currentQuestions, ...moreQuestions]);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      }
    }
  };

  const shareResults = () => {
    const score = userAnswers.filter(a => a).length;
    const total = userAnswers.length;
    const resultGrid = userAnswers.map(correct => correct ? '✅' : '❌').join('');
    const categoryName = gameMode === 'daily' ? 'Daily Challenge' : categoryNames[gameMode];
    const text = `🎯 TRIVJAM ${categoryName} Score: ${score}/${total}\n${resultGrid}\n\nCan you beat my score?`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
  };

  const resetGame = () => {
    setScreen('home');
    setCurrentQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setGameMode(null);
  };

  // Loading Screen
  if (screen === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        fontFamily: '"Fredoka", "Comic Sans MS", sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '2rem',
          animation: 'spin 1s linear infinite'
        }}>
          🎯
        </div>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Generating Questions...
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.1rem',
          textAlign: 'center'
        }}>
          Creating fresh trivia just for you! ✨
        </p>
        
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Home Screen
  if (screen === 'home') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        fontFamily: '"Fredoka", "Comic Sans MS", sans-serif'
      }}>
        {/* Top Right Buttons */}
        <div style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          gap: '0.75rem',
          zIndex: 100
        }}>
          {/* Stats Button */}
          {isLoggedIn && (
            <button
              onClick={() => setShowStats(true)}
              style={{
                padding: '1rem',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              <BarChart3 size={24} color="#667eea" />
            </button>
          )}
          
          {/* Account Button */}
          <button
            onClick={() => {
              if (isLoggedIn) {
                handleLogout();
              } else {
                setAuthStep('credentials');
                setVerificationCode('');
                setTempAuthData(null);
                setShowAuth(true);
              }
            }}
            style={{
              padding: '1rem',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            {isLoggedIn ? <LogOut size={24} color="#667eea" /> : <User size={24} color="#667eea" />}
          </button>
          
          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(true)}
            style={{
              padding: '1rem',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'rotate(90deg) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'rotate(0deg) scale(1)';
            }}
          >
            <Settings size={24} color="#667eea" />
          </button>
        </div>

        {/* Auth Modal */}
        {showAuth && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => {
            setShowAuth(false);
            setAuthStep('credentials');
            setVerificationCode('');
            setTempAuthData(null);
          }}
          >
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'slideIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              {authStep === 'credentials' ? (
                <>
                  <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#667eea',
                    marginBottom: '0.5rem',
                    textAlign: 'center'
                  }}>
                    {authMode === 'login' ? 'Welcome Back!' : 'Create Account'}
                  </h2>
                  <p style={{
                    color: '#666',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    fontSize: '0.95rem'
                  }}>
                    {authMode === 'login' ? 'Log in to track your stats' : 'Sign up to save your progress'}
                  </p>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const emailOrPhone = e.target.emailOrPhone.value;
                    const password = e.target.password.value;
                    
                    if (authMode === 'login') {
                      handleLoginCredentials(emailOrPhone, password);
                    } else {
                      const username = e.target.username.value;
                      handleSignupCredentials(emailOrPhone, password, username);
                    }
                  }}>
                    {authMode === 'signup' && (
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        autoFocus
                        style={{
                          width: '100%',
                          padding: '1rem',
                          fontSize: '1.1rem',
                          border: '2px solid #e0e0e0',
                          borderRadius: '10px',
                          marginBottom: '1rem',
                          fontFamily: 'inherit',
                          outline: 'none',
                          transition: 'border 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                      />
                    )}
                    
                    <input
                      type="text"
                      name="emailOrPhone"
                      placeholder="Email or Phone Number"
                      autoFocus={authMode === 'login'}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1.1rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        marginBottom: '1rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        transition: 'border 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                    
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1.1rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        marginBottom: '1.5rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        transition: 'border 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                    
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        cursor: 'pointer',
                        marginBottom: '1rem',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(102,126,234,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {authMode === 'login' ? 'Continue' : 'Sign Up'}
                    </button>
                  </form>
                  
                  <button
                    onClick={() => {
                      setAuthMode(authMode === 'login' ? 'signup' : 'login');
                      setAuthStep('credentials');
                      setVerificationCode('');
                      setTempAuthData(null);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '0.95rem',
                      background: 'none',
                      border: 'none',
                      color: '#667eea',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    {authMode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
                  </button>
                </>
              ) : (
                <>
                  <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#667eea',
                    marginBottom: '0.5rem',
                    textAlign: 'center'
                  }}>
                    Verify Your {tempAuthData?.emailOrPhone?.includes('@') ? 'Email' : 'Phone'}
                  </h2>
                  <p style={{
                    color: '#666',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    fontSize: '0.95rem'
                  }}>
                    Enter the 6-digit code sent to<br />
                    <strong>{tempAuthData?.emailOrPhone}</strong>
                  </p>
                  
                  {/* Demo notice */}
                  <div style={{
                    background: '#fef3c7',
                    border: '2px solid #f59e0b',
                    borderRadius: '10px',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem',
                    color: '#92400e'
                  }}>
                    <strong>Demo Mode:</strong> Your verification code is <strong style={{ fontSize: '1.2rem', color: '#667eea' }}>{verificationCode}</strong>
                    <br /><br />
                    <em style={{ fontSize: '0.85rem' }}>In production, this would be sent to your email/phone</em>
                  </div>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const code = e.target.code.value;
                    handleVerification(code);
                  }}>
                    <input
                      type="text"
                      name="code"
                      placeholder="Enter 6-digit code"
                      maxLength="6"
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1.5rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        marginBottom: '1.5rem',
                        fontFamily: 'monospace',
                        textAlign: 'center',
                        letterSpacing: '0.5rem',
                        outline: 'none',
                        transition: 'border 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                    
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        cursor: 'pointer',
                        marginBottom: '1rem',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(102,126,234,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Verify & Continue
                    </button>
                  </form>
                  
                  <button
                    onClick={() => {
                      setAuthStep('credentials');
                      setVerificationCode('');
                      setTempAuthData(null);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '0.95rem',
                      background: 'none',
                      border: 'none',
                      color: '#667eea',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    ← Back to login
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Stats Modal */}
        {showStats && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
            overflowY: 'auto'
          }}
          onClick={() => setShowStats(false)}
          >
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'slideIn 0.3s ease',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#667eea',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <BarChart3 /> Your Stats
              </h2>
              <p style={{
                color: '#666',
                marginBottom: '2rem',
                fontSize: '0.95rem'
              }}>
                @{username}
              </p>
              
              {/* Overall Stats */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '1.5rem',
                borderRadius: '15px',
                marginBottom: '1.5rem',
                color: 'white'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  Overall Performance
                </h3>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '900',
                  marginBottom: '0.5rem'
                }}>
                  {userStats.overall.total > 0 
                    ? Math.round((userStats.overall.correct / userStats.overall.total) * 100)
                    : 0}%
                </div>
                <div style={{
                  fontSize: '1rem',
                  opacity: 0.9
                }}>
                  {userStats.overall.correct} / {userStats.overall.total} questions correct
                </div>
              </div>
              
              {/* Daily Challenge Stats */}
              <div style={{
                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                padding: '1.5rem',
                borderRadius: '15px',
                marginBottom: '1.5rem',
                color: 'white'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Clock size={20} /> Daily Challenge
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '0.5rem'
                }}>
                  <div>
                    <div style={{
                      fontSize: '2.5rem',
                      fontWeight: '900',
                      lineHeight: 1
                    }}>
                      {userStats.daily.total > 0 
                        ? Math.round((userStats.daily.correct / userStats.daily.total) * 100)
                        : 0}%
                    </div>
                    <div style={{
                      fontSize: '0.85rem',
                      opacity: 0.9,
                      marginTop: '0.25rem'
                    }}>
                      Average
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '2.5rem',
                      fontWeight: '900',
                      lineHeight: 1
                    }}>
                      {userStats.bestDailyScore}/10
                    </div>
                    <div style={{
                      fontSize: '0.85rem',
                      opacity: 0.9,
                      marginTop: '0.25rem'
                    }}>
                      Best Score
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '0.95rem',
                  opacity: 0.9,
                  paddingTop: '0.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.3)'
                }}>
                  {Math.floor(userStats.daily.total / 10)} {Math.floor(userStats.daily.total / 10) === 1 ? 'challenge' : 'challenges'} completed
                </div>
              </div>

              {/* Best Streak */}
              <div style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                padding: '1.5rem',
                borderRadius: '15px',
                marginBottom: '1.5rem',
                color: 'white',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  🔥 Best Streak
                </h3>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: '900',
                  marginBottom: '0.25rem'
                }}>
                  {userStats.bestStreak}
                </div>
                <div style={{
                  fontSize: '1rem',
                  opacity: 0.9
                }}>
                  Correct answers in a row
                </div>
              </div>
              
              {/* Category Stats */}
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#333',
                marginBottom: '1rem'
              }}>
                By Category
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {Object.keys(categoryNames).map(category => {
                  const stats = userStats[category];
                  const percentage = stats.total > 0 
                    ? Math.round((stats.correct / stats.total) * 100)
                    : 0;
                  
                  return (
                    <div
                      key={category}
                      style={{
                        background: '#f7f7f7',
                        padding: '1rem',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#333',
                          marginBottom: '0.25rem'
                        }}>
                          {categoryNames[category]}
                        </div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: '#666'
                        }}>
                          {stats.correct} / {stats.total} correct
                        </div>
                      </div>
                      <div style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: percentage >= 70 ? '#22c55e' : percentage >= 50 ? '#f59e0b' : '#667eea'
                      }}>
                        {percentage}%
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Achievements */}
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#333',
                marginBottom: '1rem',
                marginTop: '2rem'
              }}>
                🏆 Achievements
              </h3>
              
              {achievementTiers.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.75rem'
                }}>
                  {achievementTiers.map(achievement => {
                    const isUnlocked = achievements.includes(achievement.id);
                    
                    return (
                      <div
                        key={achievement.id}
                        style={{
                          background: isUnlocked ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : '#f7f7f7',
                          padding: '1rem',
                          borderRadius: '12px',
                          textAlign: 'center',
                          opacity: isUnlocked ? 1 : 0.5,
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{
                          fontSize: '2rem',
                          marginBottom: '0.5rem',
                          filter: isUnlocked ? 'none' : 'grayscale(100%)'
                        }}>
                          {achievement.icon}
                        </div>
                        <div style={{
                          fontSize: '0.85rem',
                          fontWeight: '700',
                          color: isUnlocked ? 'white' : '#666',
                          marginBottom: '0.25rem'
                        }}>
                          {achievement.name}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: isUnlocked ? 'rgba(255,255,255,0.9)' : '#999'
                        }}>
                          {achievement.requirement} streak
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#999',
                  fontSize: '0.95rem'
                }}>
                  Complete category games to unlock achievements!
                </div>
              )}
              
              <button
                onClick={() => setShowStats(false)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  background: '#667eea',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  marginTop: '1.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#764ba2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#667eea';
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Settings Button - REMOVED as it's now in top right */}

        {/* Settings Modal */}
        {showSettings && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setShowSettings(false)}
          >
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'slideIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#667eea',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Settings /> Settings
              </h2>
              
              
              <p style={{
                textAlign: 'center',
                color: '#666',
                fontSize: '1rem',
                marginBottom: '1.5rem'
              }}>
                More settings coming soon!
              </p>


              <button
                onClick={() => setShowSettings(false)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  background: '#667eea',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#764ba2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#667eea';
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            animation: 'bounce 2s infinite'
          }}>🎯</div>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '900',
            color: 'white',
            margin: '0 0 0.5rem 0',
            textShadow: '4px 4px 0 rgba(0,0,0,0.2)',
            letterSpacing: '2px'
          }}>TRIVJAM</h1>
          {isLoggedIn && (
            <p style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: '1.1rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              Welcome back, {username}! 👋
            </p>
          )}
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '1.2rem',
            marginBottom: '3rem'
          }}>Learn something new with every question!</p>

          <button
            onClick={startDailyChallenge}
            style={{
              width: '100%',
              padding: '2rem',
              fontSize: '1.5rem',
              fontWeight: '700',
              background: (isLoggedIn && hasPlayedToday) 
                ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
                : 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
              border: 'none',
              borderRadius: '20px',
              color: 'white',
              cursor: (isLoggedIn && hasPlayedToday) ? 'not-allowed' : 'pointer',
              marginBottom: (isLoggedIn && hasPlayedToday) ? '0.5rem' : '1.5rem',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              position: 'relative',
              opacity: (isLoggedIn && hasPlayedToday) ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoggedIn || !hasPlayedToday) {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoggedIn || !hasPlayedToday) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
              }
            }}
          >
            {(isLoggedIn && hasPlayedToday) ? (
              <>
                <CheckCircle2 size={32} />
                COMPLETED TODAY
              </>
            ) : (
              <>
                <Clock size={32} />
                DAILY CHALLENGE
              </>
            )}
          </button>

          {(isLoggedIn && hasPlayedToday) && (
            <p style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.9)',
              fontSize: '0.95rem',
              marginBottom: '1.5rem',
              fontWeight: '500'
            }}>
              Next challenge available at midnight ⏰
            </p>
          )}

          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#667eea',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <Grid3x3 /> CATEGORIES
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem'
            }}>
              {Object.keys(triviaDatabase).map(category => (
                <button
                  key={category}
                  onClick={() => startCategoryGame(category)}
                  style={{
                    padding: '1.5rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '15px',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  {categoryNames[category]}
                </button>
              ))}
            </div>
          </div>

          {!isLoggedIn && (
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)'
            }}>
              <p style={{
                color: 'white',
                fontSize: '1rem',
                marginBottom: '1rem',
                fontWeight: '500'
              }}>
                📊 Want to track your progress?
              </p>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setAuthStep('credentials');
                  setVerificationCode('');
                  setTempAuthData(null);
                  setShowAuth(true);
                }}
                style={{
                  padding: '0.8rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  background: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#667eea',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Create Free Account
              </button>
            </div>
          )}
        </div>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700;900&display=swap');
        `}</style>
      </div>
    );
  }

  // Game Screen
  if (screen === 'game') {
    const currentQ = currentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    const isCorrect = selectedAnswer === currentQ.correct;

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        fontFamily: '"Fredoka", "Comic Sans MS", sans-serif'
      }}>
        {/* Settings Button */}
        <button
          onClick={() => setShowSettings(true)}
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            padding: '1rem',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'all 0.2s',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'rotate(90deg) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'rotate(0deg) scale(1)';
          }}
        >
          <Settings size={24} color="#667eea" />
        </button>

        {/* Settings Modal */}
        {showSettings && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setShowSettings(false)}
          >
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'slideIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#667eea',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Settings /> Settings
              </h2>
              
              
              <p style={{
                textAlign: 'center',
                color: '#666',
                fontSize: '1rem',
                marginBottom: '1.5rem'
              }}>
                More settings coming soon!
              </p>


              <button
                onClick={() => setShowSettings(false)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  background: '#667eea',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#764ba2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#667eea';
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Achievement Unlocked Modal */}
        {showAchievement && (
          <div style={{
            position: 'fixed',
            top: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            padding: '1.5rem 2rem',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
            zIndex: 2000,
            animation: 'slideDown 0.5s ease',
            maxWidth: '90%',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '0.5rem'
            }}>
              {showAchievement.icon}
            </div>
            <div style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '0.25rem'
            }}>
              Achievement Unlocked!
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '900',
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              {showAchievement.name}
            </div>
            <div style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.9)'
            }}>
              {showAchievement.description}
            </div>
          </div>
        )}

        <div style={{
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          {/* Main Menu Button for Category Games */}
          {gameMode !== 'daily' && (
            <button
              onClick={() => {
                // Save stats before returning to menu
                if (isLoggedIn && userAnswers.length > 0) {
                  updateStats(userAnswers, gameMode);
                }
                setScreen('home');
              }}
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                padding: '0.8rem 1.2rem',
                fontSize: '1rem',
                fontWeight: '600',
                background: 'white',
                border: 'none',
                borderRadius: '10px',
                color: '#667eea',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                transition: 'all 0.2s',
                zIndex: 100
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              ← Main Menu
            </button>
          )}

          {/* Progress Bar / Streak Counter */}
          {gameMode === 'daily' ? (
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              height: '12px',
              borderRadius: '10px',
              marginBottom: '2rem',
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
                height: '100%',
                width: `${progress}%`,
                transition: 'width 0.3s ease',
                borderRadius: '10px'
              }} />
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              background: currentStreak >= 5 ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 'rgba(255,255,255,0.2)',
              borderRadius: '15px',
              marginBottom: '2rem',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '900',
                color: 'white',
                marginBottom: '0.25rem'
              }}>
                {currentStreak >= 5 ? '🔥' : '⭐'} {currentStreak}
              </div>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: 'white',
                opacity: 0.9
              }}>
                {currentStreak === 0 ? 'Start your streak!' : currentStreak === 1 ? 'Correct answer!' : `Correct in a row!`}
              </div>
            </div>
          )}

          {/* Question Counter */}
          {gameMode === 'daily' && (
            <div style={{
              textAlign: 'center',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '2rem',
              opacity: 0.9
            }}>
              Question {currentQuestionIndex + 1} of {currentQuestions.length}
            </div>
          )}

          {/* Question Card */}
          <div style={{
            background: 'white',
            borderRadius: '25px',
            padding: '3rem 2rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#333',
              marginBottom: '2.5rem',
              lineHeight: '1.4',
              textAlign: 'center'
            }}>
              {currentQ.q}
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {currentQ.options.map((option, index) => {
                let buttonStyle = {
                  padding: '1.5rem',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  background: selectedAnswer === index ? '#667eea' : '#f7f7f7',
                  color: selectedAnswer === index ? 'white' : '#333',
                  border: '3px solid',
                  borderColor: selectedAnswer === index ? '#667eea' : '#e0e0e0',
                  borderRadius: '15px',
                  cursor: showFeedback ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                };

                if (showFeedback) {
                  if (index === currentQ.correct) {
                    buttonStyle = {
                      ...buttonStyle,
                      background: '#4ade80',
                      borderColor: '#22c55e',
                      color: 'white'
                    };
                  } else if (selectedAnswer === index) {
                    buttonStyle = {
                      ...buttonStyle,
                      background: '#f87171',
                      borderColor: '#ef4444',
                      color: 'white'
                    };
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                      if (!showFeedback && selectedAnswer !== index) {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.transform = 'translateX(8px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!showFeedback && selectedAnswer !== index) {
                        e.target.style.borderColor = '#e0e0e0';
                        e.target.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    <span style={{ fontWeight: '700', marginRight: '0.5rem' }}>
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          {!showFeedback && (
            <button
              onClick={submitAnswer}
              disabled={selectedAnswer === null}
              style={{
                width: '100%',
                padding: '1.5rem',
                fontSize: '1.3rem',
                fontWeight: '700',
                background: selectedAnswer !== null 
                  ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' 
                  : '#ccc',
                border: 'none',
                borderRadius: '15px',
                color: 'white',
                cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                boxShadow: selectedAnswer !== null ? '0 6px 20px rgba(0,0,0,0.3)' : 'none',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (selectedAnswer !== null) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedAnswer !== null) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                }
              }}
            >
              SUBMIT ANSWER
            </button>
          )}

          {/* Feedback */}
          {showFeedback && (
            <>
              {isCorrect && (
                <div style={{
                  background: '#4ade80',
                  color: 'white',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                  animation: 'slideIn 0.3s ease',
                  marginBottom: '1rem'
                }}>
                  ✅ Correct!
                </div>
              )}

              {!showExplanation && (
                <button
                  onClick={() => setShowExplanation(true)}
                  style={{
                    width: '100%',
                    padding: '1.2rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    background: 'white',
                    border: '3px solid #667eea',
                    borderRadius: '15px',
                    color: '#667eea',
                    cursor: 'pointer',
                    marginBottom: '1rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#667eea';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.color = '#667eea';
                  }}
                >
                  📚 Read More About This
                </button>
              )}

              {showExplanation && (
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  marginBottom: '1rem',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                  animation: 'slideIn 0.3s ease'
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#667eea',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    💡 Did You Know?
                  </h3>
                  <p style={{
                    fontSize: '1.05rem',
                    lineHeight: '1.6',
                    color: '#333',
                    marginBottom: '1.5rem'
                  }}>
                    {currentQ.explanation}
                  </p>
                  <a
                    href={currentQ.wiki}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '0.8rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
                    }}
                  >
                    🌐 Learn More on Wikipedia
                  </a>
                </div>
              )}

              <button
                onClick={nextQuestion}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  border: 'none',
                  borderRadius: '15px',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                }}
              >
                {gameMode === 'daily' && currentQuestionIndex >= currentQuestions.length - 1 
                  ? 'SEE RESULTS 🏆' 
                  : 'NEXT QUESTION →'}
              </button>
            </>
          )}
        </div>

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(-100px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  // Results Screen
  if (screen === 'results') {
    const score = userAnswers.filter(a => a).length;
    const total = userAnswers.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        fontFamily: '"Fredoka", "Comic Sans MS", sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Settings Button */}
        <button
          onClick={() => setShowSettings(true)}
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            padding: '1rem',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'all 0.2s',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'rotate(90deg) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'rotate(0deg) scale(1)';
          }}
        >
          <Settings size={24} color="#667eea" />
        </button>

        {/* Settings Modal */}
        {showSettings && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setShowSettings(false)}
          >
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'slideIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#667eea',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Settings /> Settings
              </h2>
              
              
              <p style={{
                textAlign: 'center',
                color: '#666',
                fontSize: '1rem',
                marginBottom: '1.5rem'
              }}>
                More settings coming soon!
              </p>


              <button
                onClick={() => setShowSettings(false)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  background: '#667eea',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#764ba2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#667eea';
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div style={{
          maxWidth: '600px',
          width: '100%',
          background: 'white',
          borderRadius: '30px',
          padding: '3rem 2rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '5rem',
            marginBottom: '1rem',
            animation: 'bounce 1s ease-in-out'
          }}>
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : percentage >= 40 ? '👍' : '💪'}
          </div>

          <h1 style={{
            fontSize: '3rem',
            fontWeight: '900',
            color: '#667eea',
            marginBottom: '1rem'
          }}>
            {percentage >= 80 ? 'Amazing!' : percentage >= 60 ? 'Great Job!' : percentage >= 40 ? 'Good Try!' : 'Keep Practicing!'}
          </h1>

          <div style={{
            fontSize: '4rem',
            fontWeight: '900',
            color: '#333',
            marginBottom: '2rem'
          }}>
            {score}/{total}
          </div>

          {/* Answer Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '0.8rem',
            marginBottom: '2.5rem',
            padding: '1.5rem',
            background: '#f7f7f7',
            borderRadius: '15px'
          }}>
            {userAnswers.map((correct, index) => (
              <div
                key={index}
                style={{
                  fontSize: '2rem',
                  animation: `popIn 0.3s ease ${index * 0.05}s backwards`
                }}
              >
                {correct ? '✅' : '❌'}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <button
            onClick={shareResults}
            style={{
              width: '100%',
              padding: '1.5rem',
              fontSize: '1.3rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              border: 'none',
              borderRadius: '15px',
              color: 'white',
              cursor: 'pointer',
              marginBottom: '1rem',
              boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }}
          >
            <Share2 /> SHARE RESULTS
          </button>

          <button
            onClick={resetGame}
            style={{
              width: '100%',
              padding: '1.5rem',
              fontSize: '1.3rem',
              fontWeight: '700',
              background: 'white',
              border: '3px solid #667eea',
              borderRadius: '15px',
              color: '#667eea',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#667eea';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#667eea';
            }}
          >
            PLAY AGAIN
          </button>
        </div>

        <style>{`
          @keyframes popIn {
            from {
              opacity: 0;
              transform: scale(0);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    );
  }
}
