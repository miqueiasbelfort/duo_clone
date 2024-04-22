"use client";
import React, { useTransition } from 'react';
import { courses, userProgress } from '@/db/schema';
import { useRouter } from 'next/navigation';
import Card from './Card';
import { upsertUserProgress } from '@/actions/user-progress';
import { toast } from 'sonner';

type Props = {
    courses: typeof courses.$inferInsert[];
    activedCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

function List({ courses, activedCourseId }: Props) {

    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        if (pending) return;
        if (id === activedCourseId) {
            return router.push('/learn');
        };
        startTransition(() => {
            upsertUserProgress(id)
                .catch(err => toast.error("Something went wrong."))
        })
    };

    return (
        <div className='pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4'>
            {courses.map(course => (
                <Card
                    key={course.id}
                    id={course.id ? course.id : 0}
                    title={course.title}
                    imageSrc={course.imageSrc}
                    onClick={onClick}
                    disabled={pending}
                    active={course.id == activedCourseId}
                />
            ))}
        </div>
    );
};

export default List;