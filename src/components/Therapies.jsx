import { useState, useEffect } from 'react';
import './Therapies.css';

const therapies = [
  { id: 'colon', num: '01', title: 'Colon Hydrotherapy', desc: 'A clean, strong and well functioning colon is extremely important for maintaining good health. An unclean, weak and poorly functioning colon is a breeding ground for disease. Many experts now believe that the average person has 5 to 20 pounds of accumulated waste matter in their colon. This therapy helps eliminate this waste, improving nutrient absorption and energy.', points: ['Weight loss support', 'Improved nutrient absorption', 'Relief from fatigue', 'Allergies & Depression relief'] },
  { id: 'qi', num: '02', title: 'Qi / IR Therapy', desc: 'Qi is applied in traditional Chinese medicine. With modern technology, sophisticated equipment treats acupuncture points without needles to promote the flow of Qi and blood. IR rays are used to relieve muscle pain and stiffness, transporting oxygen-rich blood to hurt muscles and joints.', points: ['Respiratory Diseases', 'Digestive Diseases', 'Bone & Joint Diseases', 'Nervous System Diseases'] },
  { id: 'detox', num: '03', title: 'Total Detoxification', desc: 'Toxins are the main cause of majority of health problems we face today. A total detox includes cleansing of the colon, a liver and kidney detox, leading to an improvement in blood circulation & skin. This 3-week program transforms your health.', points: ['Weight management', 'Glowing skin', 'Immunity boost', 'Pre-pregnancy detox'] },
  { id: 'neuro', num: '04', title: 'Neurodegenerative Diseases', desc: 'For conditions like MND/ALS and MS, the most important factor is improving the patient\'s quality of life. Healthshastra offers a detoxification treatment programme specially designed for such patients, bringing balance to their overall health.', points: ['MND / ALS support', 'MS symptom management', 'Specialized Detox', 'Mobility Aids'] },
  { id: 'thermal', num: '05', title: 'Thermal Therapy', desc: 'Provides heat directly to the anal canal, relaxing muscles and promoting venous circulation to encourage natural healing. It stimulates white blood cell production, seeking out areas that need repair.', points: ['Corrects Prostate Troubles', 'Reduces Haemorrhoids', 'Non-Surgical', 'Immune system cleansing'] },
  { id: 'ozone', num: '06', title: 'Ozone Therapy', desc: 'Developed in Germany over 125 years ago, Ozone is oxygen with an extra molecule. It quickly combines with blood, lymph & tissues to purify them. It destroys viruses, stimulates the immune system, and has an anti-ageing effect.', points: ['Destroys viruses & bacteria', 'Stimulates immune system', 'Cleans arteries & veins', 'Anti-ageing effect'] }
];

const Therapies = () => {
  return (
    <section className="therapies-section" id="therapies">
      <div className="parallax-bg-container">
        <div className="parallax-bg" style={{ backgroundImage: 'url(/parallax_bg_1.png)' }}></div>
        <div className="parallax-overlay"></div>
      </div>
      
      <div className="therapies-content">
        {therapies.map((therapy) => (
          <div key={therapy.id} className="therapy-block">
            <div className="therapy-card">
              <span className="therapy-num">{therapy.num} // THERAPY</span>
              <h2 className="therapy-title">{therapy.title}</h2>
              <p className="therapy-desc">{therapy.desc}</p>
              
              <div className="therapy-points">
                {therapy.points.map((point, index) => (
                  <span key={index} className="therapy-tag">{point}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Therapies;
