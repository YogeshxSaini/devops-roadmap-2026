import { InteractiveRoadmap } from '@/components/roadmap/InteractiveRoadmap';

export const metadata = {
  title: 'Roadmap — DevOps Roadmap 2026',
  description: 'The full interactive DevOps roadmap. 142+ skills across 16 categories. Click to track, double-click to open.',
};

export default function RoadmapPage() {
  return (
    <div className="-mx-5 -mt-0">
      <InteractiveRoadmap />
    </div>
  );
}
