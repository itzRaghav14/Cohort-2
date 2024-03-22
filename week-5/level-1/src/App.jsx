
function App() {
  return (
    <div className="p-5 space-y-3">
      <Card
        title="Lokeshwar"
        description="A TA in the 100xDevs Cohort 2.0"
        interests={["Ionic", "Open Source", "App Dev"]}
        linkedinUrl=""
        twitterUrl=""
      />
      <Card
        title="Shikha"
        description="A teacher at J. C. Bose University of Science and Technology"
        interests={["Gossips", "Gossips", "Gossips"]}
        linkedinUrl=""
        twitterUrl=""
      />
    </div>
  );
}

function Card({ title, description, interests, linkedinUrl, twitterUrl }) {
  return (
    <div className="w-96 px-4 py-6 border border-gray-200 space-y-3 rounded-lg shadow-md">
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
      <div className="space-y-1">
        <h4 className="font-medium">Interests</h4>
        <ul className="text-sm">
          {interests.map((interest) => (
            <p key={Math.random()}>{interest}</p>
          ))}
        </ul>
      </div>
      <div className="space-x-4 text-white">
        <a href={linkedinUrl} className="px-4 py-2 bg-blue-500 rounded-md inline-block hover:bg-blue-600">
          Linkedin
        </a>
        <a href={twitterUrl} className="px-4 py-2 bg-blue-500 rounded-md inline-block hover:bg-blue-600">
          Twitter
        </a>
      </div>
    </div>
  );
}

export default App;
