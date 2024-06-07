import { useEffect, useState } from "react";

function Card() {
  const [loading, setLoading] = useState(true);

  const [quoteData, setQuoteData] = useState(null);

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuoteData(data);
        setLoading(false);
      });
  }, []);


  return loading ? (
    <div className="border max-h-1/2 border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="font-mono h-3/4 max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full object-fit h-1/2"
        src="https://source.unsplash.com/random"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{quoteData?.content}</div>
        <p className="text-gray-700 text-base">{quoteData?.author}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {quoteData?.tags?.map((tag) => {
          return (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          );
        })}
      </div>
    </div>
  );


}

export default Card;

