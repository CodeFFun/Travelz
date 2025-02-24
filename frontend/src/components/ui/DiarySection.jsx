export default function DiarySection() {
    const diaries = [
        { title: "Meeting Notes", tags: "Work, Project", date: "20 Feb 2025" },
        { title: "Travel Journal", tags: "Vacation, Adventure", date: "19 Feb 2025" },
        { title: "Travel Journal", tags: "Vacation, Adventure", date: "19 Feb 2025" },
        { title: "Travel Journal", tags: "Vacation, Adventure", date: "19 Feb 2025" },
      ];
      
    return(
        <>
            <div className="p-6 bg-white rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Diary</h2>
            <a href="#" className="text-blue-500 text-sm">See more</a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {diaries.map((diary, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl shadow-sm flex justify-between">
                <div>
                  <h3 className="font-medium text-lg">{diary.title}</h3>
                  <p className="text-gray-500 text-sm">{diary.tags}</p>
                </div>
                <p className="text-gray-500 text-sm">{diary.date}</p>
              </div>
            ))}
          </div>
        </div>
        </>
    )
}