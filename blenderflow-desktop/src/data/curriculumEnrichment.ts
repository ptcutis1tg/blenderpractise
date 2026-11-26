import { CurriculumModule } from './curriculumDatabase';
import {
  EXTRA_LESSONS_PART1,
  UPGRADED_CONTENT_PART1,
  LAB_MAP_PART1,
  CONCEPT_CHECKS_PART1,
  VIDEOS_PART1,
} from './curriculumEnrichmentPart1';
import {
  EXTRA_LESSONS_PART2,
  UPGRADED_CONTENT_PART2,
  LAB_MAP_PART2,
  CONCEPT_CHECKS_PART2,
  VIDEOS_PART2,
} from './curriculumEnrichmentPart2';

const EXTRA_LESSONS = { ...EXTRA_LESSONS_PART1, ...EXTRA_LESSONS_PART2 };
const UPGRADED_CONTENT = { ...UPGRADED_CONTENT_PART1, ...UPGRADED_CONTENT_PART2 };
const LAB_MAP = { ...LAB_MAP_PART1, ...LAB_MAP_PART2 };
const CONCEPT_CHECKS = { ...CONCEPT_CHECKS_PART1, ...CONCEPT_CHECKS_PART2 };
const VIDEOS = { ...VIDEOS_PART1, ...VIDEOS_PART2 };

export function applyCurriculumEnrichment(rawModules: CurriculumModule[]): CurriculumModule[] {
  return rawModules.map((mod) => {
    const extras = EXTRA_LESSONS[mod.id] || [];
    const combinedLessons = [...mod.lessons, ...extras];

    const enrichedLessons = combinedLessons.map((lesson) => {
      const upgrade = UPGRADED_CONTENT[lesson.id];
      return {
        ...lesson,
        ...(upgrade ? upgrade : {}),
        interactiveLabId: LAB_MAP[lesson.id] || lesson.interactiveLabId,
        conceptChecks: CONCEPT_CHECKS[lesson.id] || lesson.conceptChecks,
        videoResources: VIDEOS[lesson.id] || lesson.videoResources,
      };
    });

    return {
      ...mod,
      lessons: enrichedLessons,
    };
  });
}
