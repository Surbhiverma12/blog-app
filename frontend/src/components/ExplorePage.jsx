import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Compass, 
  Zap, 
  Rocket, 
  Filter 
} from 'lucide-react';

// Sample topic categories
const topicCategories = [
  {
    id: 1,
    name: "Technology",
    description: "Cutting-edge insights and innovations",
    color: "bg-blue-600",
    icon: Zap,
    postCount: 24
  },
  {
    id: 2,
    name: "Design",
    description: "Creative processes and user experiences",
    color: "bg-purple-600",
    icon: Layers,
    postCount: 18
  },
  {
    id: 3,
    name: "Lifestyle",
    description: "Personal growth and wellness",
    color: "bg-green-600",
    icon: Rocket,
    postCount: 15
  },
  {
    id: 4,
    name: "Programming",
    description: "Code, development, and software engineering",
    color: "bg-indigo-600",
    icon: BookOpen,
    postCount: 32
  }
];

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTopics = topicCategories.filter(topic => 
    topic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-300 mb-4">Explore Topics</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Discover diverse topics, find your passion, and dive deep into interesting content
          </p>
        </header>

        <div className="mb-8 flex items-center">
          <div className="relative flex-grow mr-4">
            <input 
              type="text" 
              placeholder="Search topics..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 text-white p-3 rounded-lg pl-10"
            />
            <Compass className="absolute left-3 top-3.5 text-gray-500" />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTopics.map(topic => {
            const TopicIcon = topic.icon;
            return (
              <div 
                key={topic.id} 
                className="bg-gray-800 rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className={`w-16 h-16 rounded-full ${topic.color} flex items-center justify-center mb-4`}>
                  <TopicIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-blue-300">{topic.name}</h2>
                <p className="text-gray-400 mb-4">{topic.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {topic.postCount} Posts
                  </span>
                  <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
                    <span>Explore</span>
                    <Rocket className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;