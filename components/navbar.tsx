import { createPost, uploadImage } from '@/pages/api/api';
import { convertFormValues } from '@/pages/common/utils';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useReadLocalStorage } from 'usehooks-ts';

const Navbar = (props: any) => {
  const { user } = useSelector((state: any) => state.user);
  const token = useReadLocalStorage('jwt');

  const [files, setFiles] = useState<{ [key: string]: any }>({
    preview: [],
    send: [],
  });

  const onUpload = (event: any) => {
    const tempFiles = event.target.files;
    let preview: Array<string> = [];
    for (const file of tempFiles) {
      let src = URL.createObjectURL(file);
      preview = [...preview, src];
    }
    setFiles({
      preview,
      send: tempFiles,
    });
  };

  const onPost = (event: FormEvent) => {
    event.preventDefault();
    const values = convertFormValues(event);
    if (!values.title) return;

    let queue: any = [];
    for (const file of files.send) {
      queue = [...queue, uploadImage(file, token as string)];
    }

    Promise.allSettled(queue).then((results) => {
      const contents = results.map(
        (result: any) =>
          ({
            alt: result.value.alt,
            src: `http://51.79.145.63:5000/image/get/${result.value.alt}`,
            content_type: result.value.content_type
          })
      );
      const params = {
        title: values.title,
        body: values.body,
        contents
      }
      return createPost(params, token as string).then((res: any) => console.log(res))
    });
  };

  const renderWhenUser = () => {
    return (
      <>
        <img src='http://51.79.145.63:5000/image/get/f1bd1470-ee1a-4828-ba1a-36763298a564' />
        <h2>Hello {user.username}</h2>
        <form
          onSubmit={onPost}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <input type="text" name="title" />
          <input type="text" name="body" />
          <label htmlFor="upload">Upload</label>
          <input
            style={{ display: 'none' }}
            id="upload"
            type="file"
            multiple
            onChange={onUpload}
          />
          <div>
            {files.preview &&
              files.preview.map((src: string, index: number) => (
                <Image
                  key={index}
                  src={src}
                  alt={src}
                  width={100}
                  height={100}
                />
              ))}
          </div>
          <button type="submit">Post</button>
        </form>
      </>
    );
  };

  return <div>{user ? renderWhenUser() : 'Navbar'}</div>;
};

export default Navbar;
