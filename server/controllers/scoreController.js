const { PrismaClient } = require('@prisma/client');
const { calculateProductivityScore } = require('../utils/scoreHelper');

const prisma = new PrismaClient();

const getScore = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      select: { completed: true, important: true, completedAt: true },
    });
    res.json(calculateProductivityScore(tasks));
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate score' });
  }
};

module.exports = { getScore };
