# **_basic-board_**

### **[프로젝트 개요]**

- #### '기본 게시판' 을 위한 백엔드 구현

### **[프로젝트 내용]**

- #### 개발 스택은 NestJS 프레임워크 기반 MySQL을 사용함
- #### Swagger(http://localhost:3000/api-docs) 기반 API 관련 확인이 가능함

- #### API 구현 항목

  - ##### 게시글 목록 조회: [GET] /posts?page=&limit=&title=&author=
  - ##### 게시글 작성: [POST] /posts { title, content, author, password }
  - ##### 게시글 수정: [PUT] /posts/:id { title?, content?, password }
  - ##### 게시글 삭제: [DELETE] /posts/:id { password }
  - ##### 댓글 목록 조회: [GET] /posts/:postId/comments?page=&limit=
  - ##### 댓글 작성: [POST] /posts/:postId/comments { content, author, parentCommentId? }

- #### DB 설계 항목

  - ##### Post

    | Name       | Type         | Note                                                  |
    | ---------- | ------------ | ----------------------------------------------------- |
    | id         | integer      | primaryKey                                            |
    | title      | varchar(255) |                                                       |
    | content    | text         |                                                       |
    | author     | varchar(100) |                                                       |
    | password   | varchar(100) |                                                       |
    | created_at | datetime     | default CURRENT_TIMESTAMP                             |
    | updated_at | datetime     | default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

  - ##### Comment

    | Name              | Type         | Note                               |
    | ----------------- | ------------ | ---------------------------------- |
    | id                | integer      | primaryKey                         |
    | content           | text         |                                    |
    | author            | varchar(100) |                                    |
    | post_id           | integer      | foreignKey (Post.id)               |
    | parent_comment_id | integer      | foreignKey (Comment.id), NULL 가능 |
    | created_at        | datetime     | default CURRENT_TIMESTAMP          |

  - ##### KeywordAlert

    | Name    | Type         | Note       |
    | ------- | ------------ | ---------- |
    | id      | integer      | primaryKey |
    | author  | varchar(100) |            |
    | keyword | varchar(100) |            |

### **[프로젝트 빌드 & 테스트 & 실행 방법]**

- #### npm i && npm start

### **[프로젝트 향후 계획]**

- #### Unit/E2E 테스트 처리 및 고도화 작업
