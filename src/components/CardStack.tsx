import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Activity {
  id: number;
  icon: string;
  title: string;
  location: string;
  date: string;
}

const activities: Activity[] = [
  {
    id: 1,
    icon: '⛺',
    title: 'Camping',
    location: 'Yosemite Park',
    date: '25 Nov'
  },
  {
    id: 2,
    icon: '⛵',
    title: 'Boating',
    location: 'Lake Tahoe Park',
    date: '12 August'
  },
  {
    id: 3,
    icon: '🍖',
    title: 'Barbecue',
    location: 'Greenfield Shores',
    date: '28 July'
  }
];

const CardStack: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <motion.div
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
        className="relative"
      >
        {/* Background elements when collapsed */}
        <AnimatePresence>
          {!isExpanded && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-2 left-2 right-2 h-16 bg-white rounded-xl shadow-md z-10"
              />
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-7 left-4 right-4 h-16 bg-white rounded-xl shadow-md z-0"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-5 left-2 right-2 h-16 bg-white rounded-xl shadow-md z-0"
              />
            </>
          )}
        </AnimatePresence>

        {/* Main container */}
        <motion.div
          layout
          transition={{
            layout: { duration: 0.3, type: "spring", stiffness: 300, damping: 30 }
          }}
          className="rounded-xl overflow-hidden z-20 relative"
        >
          {/* Always show first item */}
          <motion.div
            layout
            className="p-4 flex items-center justify-between bg-white rounded-xl shadow-md mb-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-xl">
                {activities[0].icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{activities[0].title}</h3>
                <p className="text-sm text-gray-500">{activities[0].location}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">{activities[0].date}</span>
          </motion.div>

          {/* Animated container for remaining items */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={{
                  expanded: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 }
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.19, 1.0, 0.22, 1.0] // Custom easing for bouncy effect
                }}
              >
                {activities.slice(1).map((activity, index) => (
                  <motion.div
                    key={activity.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 flex items-center justify-between bg-white rounded-xl shadow-md ${index === 0 ? 'mb-2' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-xl">
                        {activity.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-500">{activity.location}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.date}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Toggle button */}
        <motion.button
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          className={`${!isExpanded ? 'mt-9' : 'mt-6'} mx-auto bg-white transition-colors hover:bg-gray-100 rounded-full shadow-md py-2 px-6 text-sm text-gray-600 flex items-center justify-center gap-2`}
          style={{ width: "fit-content" }}
        >
          <span>{isExpanded ? "Hide" : "Show All"}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0, transition: { duration: 0.41 } }}
            transition={{ duration: 0.9, ease: [0.19, 1.0, 0.22, 1.0] }}
            >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CardStack;