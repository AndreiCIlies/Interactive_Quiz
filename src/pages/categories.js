import Link from "next/link";
import categories from "../entities/Category";

export default function Categories() {
    return (
        <div className="p-8">
          <h1 className="text-3xl font-bold">Categories</h1>
          <br></br>
          <br></br>
          <p><h1 className="text-2xl font-bold">Press on a category to start the quiz:</h1></p>
          <ul className="mt-4">
            {categories.map((category) => (
              <li key={category.id} className="mb-2">
                <Link href={`/quiz/${category.id}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
    );
}