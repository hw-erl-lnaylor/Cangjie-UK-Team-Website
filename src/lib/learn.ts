import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

export type LessonDifficulty = "beginner" | "intermediate" | "hard";

export interface LessonEntry {
    fileName: string;
    slug: string;
    index: number;
    title: string;
    description: string;
    preview: string;
    code: string;
    difficulty: LessonDifficulty;
}

const lessonsContentRoot = join(process.cwd(), "src", "content", "lessons");
const lessonDifficultyOrder: LessonDifficulty[] = [
    "beginner",
    "intermediate",
    "hard",
];

const normalizeLineEndings = (value: string) => value.replace(/\r\n/g, "\n");

const toKebabCase = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const createLessonSlug = (titleToken: string, lessonNumber: number) => {
    const base = toKebabCase(titleToken);
    const safeBase = base.length > 0 ? base : `lesson-${lessonNumber}`;
    return `${String(lessonNumber).padStart(2, "0")}-${safeBase}`;
};

const createPreview = (description: string) => {
    const plainText = description
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .join(" ");

    if (plainText.length === 0) {
        return "Open this lesson to read the full walkthrough and code sample.";
    }

    if (plainText.length <= 140) {
        return plainText;
    }

    return `${plainText.slice(0, 137)}...`;
};

const parseLessonText = (content: string, fallbackTitle: string) => {
    const normalized = normalizeLineEndings(content);
    const lines = normalized.split("\n");
    const title = lines[0]?.trim() || fallbackTitle;
    const description = lines.slice(1).join("\n").trim() || title;

    return { title, description };
};

interface LessonDirectory {
    directoryName: string;
    titleToken: string;
    order: number;
    directoryPath: string;
}

const parseLessonDirectoryName = (directoryName: string) => {
    const match = directoryName.match(/^(\d+)-(.+)$/);
    if (!match) {
        throw new Error(
            `Invalid lesson directory name \"${directoryName}\". Expected format DD-TITLE.`,
        );
    }

    const order = Number.parseInt(match[1], 10);
    if (!Number.isFinite(order) || order <= 0) {
        throw new Error(
            `Invalid lesson number in directory \"${directoryName}\".`,
        );
    }

    return {
        order,
        titleToken: match[2],
    };
};

const getLessonDirectories = async (
    difficulty: LessonDifficulty,
): Promise<LessonDirectory[]> => {
    const difficultyPath = join(lessonsContentRoot, difficulty);
    const entries = await readdir(difficultyPath, { withFileTypes: true });

    const lessonDirectories = entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => {
            const parsed = parseLessonDirectoryName(entry.name);
            return {
                directoryName: entry.name,
                titleToken: parsed.titleToken,
                order: parsed.order,
                directoryPath: join(difficultyPath, entry.name),
            };
        })
        .sort(
            (a, b) =>
                a.order - b.order || a.directoryName.localeCompare(b.directoryName),
        );

    lessonDirectories.forEach((lessonDirectory, index) => {
        const expectedOrder = index + 1;
        if (lessonDirectory.order !== expectedOrder) {
            throw new Error(
                `Lesson directories in ${difficultyPath} must be numbered sequentially from 01. Expected ${String(expectedOrder).padStart(2, "0")}-..., found ${lessonDirectory.directoryName}.`,
            );
        }
    });

    return lessonDirectories;
};

const loadLessons = async (): Promise<LessonEntry[]> => {
    const lessons: LessonEntry[] = [];

    for (const difficulty of lessonDifficultyOrder) {
        const lessonDirectories = await getLessonDirectories(difficulty);

        for (const lessonDirectory of lessonDirectories) {
            const [textContent, codeContent] = await Promise.all([
                readFile(
                    join(lessonDirectory.directoryPath, "description.txt"),
                    "utf-8",
                ),
                readFile(join(lessonDirectory.directoryPath, "script.cj"), "utf-8"),
            ]);

            const lessonNumber = lessons.length + 1;
            const { title, description } = parseLessonText(
                textContent,
                lessonDirectory.titleToken,
            );

            lessons.push({
                fileName: lessonDirectory.titleToken,
                slug: createLessonSlug(lessonDirectory.titleToken, lessonNumber),
                index: lessonNumber - 1,
                title,
                description,
                preview: createPreview(description),
                code: normalizeLineEndings(codeContent).trimEnd(),
                difficulty,
            });
        }
    }

    return lessons;
};

let lessonsPromise: Promise<LessonEntry[]> | null = null;

export const getLessons = async () => {
    if (!lessonsPromise) {
        lessonsPromise = loadLessons();
    }

    return lessonsPromise;
};
