import { Modal, Input, Textarea, Box, Button } from "@mantine/core";
import React from "react";
import { Post, PostCreate, UpdatePostArgs } from "../../common/types";
import { UseMutationResult } from "react-query";
import { FetchType } from "../../api/postOrReviewApi";
import { Authorization } from "../authorization/Authorization";

type ReaderBlogsModalFormProps = {
  opened: boolean;
  close: () => void;
  postForm: PostCreate | Post;
  setPostForm: React.Dispatch<React.SetStateAction<PostCreate | Post>>;
  currentPost: number | "create";
  mutatePost: UseMutationResult<any, unknown, UpdatePostArgs, unknown>;
  submitPost: (type: FetchType, id?: number) => Promise<void>;
  onAuth: boolean;
  closeAuth: () => void;
};

export const ReaderBlogsModalForm: React.FC<ReaderBlogsModalFormProps> = (
  props
) => {
  const {
    opened,
    close,
    postForm,
    setPostForm,
    currentPost,
    mutatePost,
    submitPost,
    onAuth,
    closeAuth,
  } = props;
  return (
    <>
      <Modal size={500} opened={onAuth} onClose={closeAuth} centered>
        <Authorization close={closeAuth} />
      </Modal>

      <Modal size="lg" opened={opened} onClose={close} centered>
        <Input
          onChange={(e) =>
            setPostForm((prev) => ({ ...prev, title: e.target.value }))
          }
          mt={10}
          value={postForm.title}
          placeholder="Заголовок"
        />
        <Input
          onChange={(e) =>
            setPostForm((prev) => ({ ...prev, postImageUrl: e.target.value }))
          }
          mt={10}
          value={postForm.postImageUrl}
          placeholder="Ссылка на картинку"
        />
        <Textarea
          onChange={(e) =>
            setPostForm((prev) => ({ ...prev, description: e.target.value }))
          }
          autosize
          value={postForm.description}
          placeholder="Пост"
          mt={10}
          mb={20}
          size="sm"
          color="dimmed"
        />
        <Box display="flex">
          {currentPost !== "create" && (
            <Button
              loading={mutatePost.isLoading}
              color="pink"
              mr={20}
              onClick={() => {
                if ("id" in postForm) submitPost("delete", postForm.id);
              }}
            >
              Удалить пост
            </Button>
          )}
          <Button
            onClick={() => {
              if ("id" in postForm) submitPost("put", postForm.id);
              else submitPost("post");
            }}
            loading={mutatePost.isLoading}
          >
            {currentPost === "create" ? "Создать пост" : "Изменить пост"}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
