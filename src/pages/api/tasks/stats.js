import dbConnect from "../../../lib/mongodb";
import Task from "../../../models/task";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const total = await Task.countDocuments({});
    const completed = await Task.countDocuments({ completed: true });
    const pending = total - completed;

    const completionPercentage =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    let rating = "No Tasks Registered";
    let tip = "Add a task to start tracking your productivity.";

    if (total > 0) {
      if (completionPercentage >= 80) {
        rating = "Elite Productivity";
        tip =
          "Exceptional momentum! You are maintaining a high completion rate.";
      } else if (completionPercentage >= 50) {
        rating = "Strong Performance";
        tip = "Good consistency. Focus on clearing pending tasks.";
      } else {
        rating = "Focus Needed";
        tip = "Try completing one high-priority task today.";
      }
    }

    const lowTotal = await Task.countDocuments({ priority: "low" });
    const lowCompleted = await Task.countDocuments({ priority: "low", completed: true });
    const lowPending = lowTotal - lowCompleted;

    const mediumTotal = await Task.countDocuments({ $or: [{ priority: "medium" }, { priority: { $exists: false } }] });
    const mediumCompleted = await Task.countDocuments({ $or: [{ priority: "medium" }, { priority: { $exists: false } }], completed: true });
    const mediumPending = mediumTotal - mediumCompleted;

    const highTotal = await Task.countDocuments({ priority: "high" });
    const highCompleted = await Task.countDocuments({ priority: "high", completed: true });
    const highPending = highTotal - highCompleted;

    return res.status(200).json({
      total,
      completed,
      pending,
      completionPercentage,
      rating,
      tip,
      priorityBreakdown: {
        low: { total: lowTotal, completed: lowCompleted, pending: lowPending },
        medium: { total: mediumTotal, completed: mediumCompleted, pending: mediumPending },
        high: { total: highTotal, completed: highCompleted, pending: highPending }
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching task stats",
      error: error.message,
    });
  }
}