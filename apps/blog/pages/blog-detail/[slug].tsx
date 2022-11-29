import React from "react";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import Image from "next/image";
import { IBlog } from "@blog/interfaces/blog.interface";
import { useRouter } from "next/router";
import { message } from "antd";
import { useUserProfile } from "@blog/utils/hooks/useUserProfile";
import { ROLE } from "@blog/interfaces/authenticate.interface";
import { convertDate } from "@blog/utils/date";

interface Props {
  blogContent: IBlog;
  [key: string]: any;
}

const BlogContent: NextPage<Props> = ({ blogContent }) => {
  const router = useRouter();
  const profile = useUserProfile();

  const handleDelete = async (id: number) => {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL_API}/blog/delete/${id}`
    );
    if (data) {
      message.success("Deleted!!", 1);
      router.push({
        pathname: "/blog",
        query: {
          page: 1,
        },
      });
    }
  };

  const handleUpdate = (slug: string) => {
    router.push({
      pathname: "/blog/update-blog",
      query: {
        slug,
      },
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div>
        <h2 className="px-4 text-center">{blogContent.title}</h2>
        <h5 className="mb-5 px-4 text-center">{convertDate(blogContent.createdAt)}</h5>
        <div className="w-full p-4 flex justify-center">
          <Image
            unoptimized={true}
            width={800}
            height={600}
            objectFit="cover"
            src={blogContent.thumbnailPath}
            alt=""
          />
        </div>
        <div
          className="w-full p-4 md:w-[800px] md:m-auto md:p-0"
          dangerouslySetInnerHTML={{ __html: `${blogContent.content}` }}
        ></div>
      </div>
    </div>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const { data: blogContent } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_API}/blog/${slug}`
  ); // your fetch function here

  // const blogContent = blogs.find((blog) => blog.slug === slug);

  if (!blogContent) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      blogContent,
    },
  };
};

export default BlogContent;
