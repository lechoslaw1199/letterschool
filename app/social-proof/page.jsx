'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import ProgressBar from "@/components/ProgressBar";
import { useImagePreload } from "@/hooks/useImagePreload";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] },
  }),
};

const contentMap = {
  "I'm preparing my child for school": {
    subtitle: "Many have prepared their children to excel in reading at school 👇",
    reviews: [
      {
        title: "This has been a game changer",
        text: "I started this program with my daughter a couple weeks ago during the summer to get her in the mindset before kindergarten. This has been a game changer. She looks forward to completing the exercises every night. She was showing signs of dyslexia as my husband has it too but this app has really helped her self correct and build confidence",
        author: "Norma C."
      },
      {
        title: "He tells everyone he can read now and is so proud of himself",
        text: "My son is in Pre-K, he's 4. He LOVES doing his reading lesson” he asks to do it every night. He tells everyone he can read now and is so proud of himself. It is helping him be so prepared for kindergarten this fall. Thank you for a wonderful program.",
        author: "Julie Gumpert"
      },
      {
        title: "This app literally changed our lives!",
        text: "My 5 year old was not ready for kindergarten last year so we decided to keep him back a year. Fast forward to this past April and he was still not reading. I had tried several other apps and none of them were working. Then I saw an ad for Reading.com and decided to give it a try. We started in May and by August he was reading! He is now in kindergarten and is one of the best readers in his class. This app literally changed our lives!",
        author: "Anonymous"
      },
      {
        title: "Fantastic program!",
        text: "We have started this with our 5 year old to prepare for kindergarten. He absolutely loves it and asks to do his reading every day. He is making unbelievable progress and I can't wait to see where he will be when he starts school. I am already planning on using this program with our 2.5 year old when he gets a little older. Fantastic program!",
        author: "Jamie Blythe"
      }
    ]
  },
  "My child is a struggling reader": {
    subtitle: "Many have taken their children from struggling to confident readers 👇",
    reviews: [
      {
        title: "Makes reading fun!",
        text: "My son is 8 and is still having a hard time reading. We tried this app a week ago and things he was struggling with (like blending sounds) is noticeable better. I love that they do a first lesson and then an assessment to find what lesson to continue on. Another thing that is helpful is that the books hide the picture before reading. This forces him to actually read. In normal books he would “guess” the words based on the picture and not actually read. My son said the app feels like a video game and he loves video games!!! And he actually wants to do it with me. I am so thankful.",
        author: "Justmellie"
      },
      {
        title: "I was feeling hopeless",
        text: "Teaching my 5 year old how to read and just learn her sounds has been such a struggle!! Was feeling hopeless. We've used some other “school” apps like Homer, KanAcademy and dulingo for kids, with no success. And even with at home curriculum we never make it very far before we just quit because I’m so frustrated and she can’t focus. We've done 7 lessons so far and she is the one reminding me to do them everyday. The alphabet song is great and actually teaches the sounds in a really fun song. The lessons are short and interactive and also make it so the parent has to be involved and do it with them. But still super simple and they go really fast. Neither of us gets burnt out. Loving it and definitely recommend it.",
        author: "pepsihero32"
      },
      {
        title: "Helped my struggling reader",
        text: "I love getting to sit alongside my daughter and do the lessons together. I was sold after our second lesson as I could already see improvement in her reading! The best part is how she is gaining confidence in her reading and she enjoys the lessons. I would recommend this to any friends who want to help teach their child to read or have a child struggling to read.",
        author: "CBlakey902"
      },
      {
        title: "The best use of screen time ever",
        text: "We have started this with our 5 year old to prepare for kindergarten. He absolutely loves it and asks to do his reading every day. He is making unbelievable progress and I can't wait to see where he will be when he starts school. I am already planning on using this program with our 2.5 year old when he gets a little older. Fantastic program!",
        author: "FJCC1921"
      }
    ]
  },
  "I'm homeschooling my child": {
    subtitle: "Our curriculum is a homeschooling favorite 👇",
    reviews: [
      {
        title: "She is ACTUALLY reading! Bravo!",
        text: "I have been trying all sorts of ways as a homeschooling mom to teach my child to read, and this is the first time she's catching on all year! She is ACTUALLY reading! Bravo!",
        author: "Lhans084"
      },
      {
        title: "This needs to be in every elementary teacher's hands",
        text: "I was ready to create my own reading curriculum because I've never found a learning tool that had it all. I was a public school teacher as well as a homeschooling mom so I know virtually all of the curriculums by heart. This is the one and only reading resource that makes sense to me. If I were to create a resource for reading, this would've been the outcome! I am so very happy with my child's progress and enthusiastic participation! This needs to be in every elementary teacher's hands. Bravo!",
        author: "Lisa Petrie"
      },
      {
        title: "I feel like they are improving after only a week!",
        text: "After struggling with homeschooling my two kids all year and making no progress I feel like they are improving after only a week!! So happy I gave it a try!!!",
        author: "dandeliondreamspodcast"
      }
    ]
  },
  "I want to bond with my child": {
    subtitle: "Our co-learning experience combines meaningful screen time and quality time with your child 👇",
    reviews: [
      {
        title: "Fun for both of us",
        text: "The app has divided what can sometimes feel like an overwhelming journey (especially for a parent who has no background in teaching) into small enjoyable daily lessons with extra games and activities to reinforce the sounds and writing of each letter. I am very thankful that I get to be a part of this learning experience with my daughter in this way that is fun for us both.",
        author: "Ayse Sultan"
      },
      {
        title: "This has been an amazing experience for my family",
        text: "I have two boys that are four and five. I wanted them to start learning how to read before either started kindergarten. They started at the same time and I was immediately impressed with the app. It's the perfect combination of fun for the kids, and baby steps from a lesson perspective. We called it “learning time” and every day I would tell them it's time to do it, but would never force it. I left it up to them. They can both read at a kindergarten level now, and I am guessing my five year old is probably at first grade. Totally worth the subscription price in my opinion. I wish they didn't stop at 99 lessons!",
        author: "Cancersucks1221"
      },
      {
        title: "Great way to spend 15 minutes a day with your child",
        text: "As a non-native English speaker, I was not sure if I could teach my four-year-old son to read. We started using the app, which we called the “reading game,” almost every day. My son quickly picked up on reading and was very motivated to use it without me forcing him. It was a fun experience for both of us. The games are not only fun but also encourage reading and provide an opportunity for family bonding. Definitely recommend to all parents whether your child attends the daycare/preschool or not. Great way to spend 15 minutes a day with your child and see his/her progress. It will make you both proud.",
        author: "OlgaSpring"
      },
      {
        title: "So different from other reading apps",
        text: "I really like that this app is meant for a parent and kid to do together...I love bonding with my kids over learning and reading and this makes it so easy to do that. It's extremely user friendly and easy for someone like me who isn't a teacher and I can see real progress in my son's skills.",
        author: "Smmarquis"
      }
    ]
  },
  "Something else": {
    subtitle: "No matter your motivation, you've found the best program to teach how to read in a fun AND efficient way! 👇",
    reviews: [
      {
        title: "BEST READING APP!!",
        text: "My #1 goal for the school year was to have my son reading by the end of the year. We've tried lots of different learning / reading apps and I haven't been that impressed. We tried Reading.com out a few weeks ago and it is a game changer!! In just a few weeks of doing it my son is now reading the simple stories / sentences on here easily. If you are a homeschooling family or just determined to help your child learn to read I definitely recommend.",
        author: "Saharabarnes"
      },
      {
        title: "By far the best!",
        text: "My daughter (5 y.o., in Kinder) and I have been using this for a couple of weeks, and it is AMAZING to see how much her reading has improved since we started! She loves the daily challenge of learning something new, unlocking new books and games, and singing the Alphabet song. I love the sliders to help visually show how to sound out words, and how short and engaging the lessons are. The first few lessons, we did stack 2-3 in a day simply because it was info she already knew, but we're taking it more slowly now. We've tried ABC Mouse and a couple other platforms but this one is our favorite! ❤️ 5/5 stars.",
        author: "TJH7717"
      },
      {
        title: "Amazing!",
        text: "I highly recommend this app to any moms willing to help their little reach reading goals or just starting out! I have had this app for quite some time and used it for my youngest daughter who was facing some reading challenges, to see how far she has come after plus working really hard in school with her teacher has sent my little one soaring! I couldn't be happier with this app helping her along the way. Being able to see the progress and being excited with her to see what the prizes she would receive was such a big deal for the both of us! She would ask on a almost daily basis for us to do her reading lesson!! Again I recommend this app to all moms and their littles!",
        author: "Bring em home"
      }
    ]
  }
};

export default function SocialProof() {
  const router = useRouter();
  const { direction, updateDirection, selectedReason } = useOnboarding();

  // Fallback to default if reason is not mapped (or use First option)
  const currentContent = contentMap[selectedReason] || contentMap["I'm preparing my child for school"];

  const isReady = useImagePreload("/VlQPe_m3.webp");

  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  return (
    <div className="w-full flex flex-col items-center bg-white min-h-screen relative overflow-x-clip">
      <header className="w-full max-w-[450px] flex flex-col items-center pt-4 pb-4 px-5 relative shrink-0">
        <button
          className="absolute left-2 top-4 text-purple-dark flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
          onClick={handleBack}
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-8 h-8">
            <g>
              <path d="M6.99219 12.3594C6.99219 12.625 7.09375 12.8516 7.30469 13.0547L13.3984 19.0156C13.5625 19.1875 13.7812 19.2734 14.0312 19.2734C14.5391 19.2734 14.9375 18.8828 14.9375 18.3672C14.9375 18.1172 14.8359 17.8906 14.6641 17.7188L9.17188 12.3594L14.6641 7C14.8359 6.82031 14.9375 6.59375 14.9375 6.34375C14.9375 5.83594 14.5391 5.44531 14.0312 5.44531C13.7812 5.44531 13.5625 5.53125 13.3984 5.70312L7.30469 11.6641C7.09375 11.8672 7 12.0938 6.99219 12.3594Z" fill="currentColor"></path>
            </g>
          </svg>
        </button>
        <img src="/VlQPe_m3.webp" alt="Reading.com" className="h-6 mb-3 object-contain" />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[480px] flex flex-col items-center flex-grow"
      >
        <div className="text-center mb-4 mt-2">
          <h1 className="text-[24px] font-bold text-black leading-tight mb-1">
            <span className="text-[#5032F5]">1.5M+</span> parents & teachers
          </h1>
          <p className="text-[16px] text-black font-medium opacity-80">
            are teaching how to read with Reading.com!
          </p>
        </div>

        <p className="text-[18px] text-center text-black mb-4 px-4 font-medium leading-tight">
          {currentContent.subtitle}
        </p>

        {/* Carousel Container */}
        <div className="w-full relative mb-6 px-0">
          <div className="embla overflow-hidden w-full" ref={emblaRef}>
            <div className="embla__container flex">
              {currentContent.reviews.map((review, index) => (
                <div key={index} className="embla__slide flex-[0_0_90%] min-w-0 px-2">
                  <div className="bg-[#221750] p-6 flex flex-col text-white rounded-[40px] my-4">
                    <h3 className="text-[22px] font-bold mb-2 leading-snug">
                      "{review.title}"
                    </h3>
                    <div className="flex gap-1 mb-2 text-[#ff9d2b]">
                      {"★★★★★".split("").map((s, i) => <span key={i} className="text-xl">★</span>)}
                    </div>
                    <p className="text-[16px] leading-relaxed mb-auto opacity-90 font-medium">
                      {review.text}
                    </p>
                    <div className="mt-6 text-[16px] font-bold">
                      {review.author}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.main>

      <motion.div
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[480px] px-8 sticky bottom-4 z-50 mt-auto pb-4"
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 bg-[#5032F5] text-white rounded-full text-[18px] font-bold transition-all shadow-md"
          onClick={() => {
            updateDirection(1);
            router.push("/milestone");
          }}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
