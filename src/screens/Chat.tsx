import { useChat } from "@ai-sdk/react";
import Link from "@components/Link";
import PageWrapper from "@components/PageWrapper";
import { ArrowRight, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { marked } from "marked";
import { NextSeo, WebPageJsonLd } from "next-seo";
import { useEffect, useRef, useState } from "react";
import { PERSONAL } from "src/constants/personal";
import styled from "styled-components";

const SUGGESTED_MESSAGES = [
  "What is your experience?",
  "Which technologies do you use?",
  "What are your current projects?",
  "How can I contact you?",
];

export default function Home() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    error,
  } = useChat({
    api: "/api/chat",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollPosition = () => {
    if (!suggestionsContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } =
      suggestionsContainerRef.current;

    setShowLeftArrow(scrollLeft > 0);

    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scrollSuggestionsLeft = () => {
    if (!suggestionsContainerRef.current) return;
    suggestionsContainerRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollSuggestionsRight = () => {
    if (!suggestionsContainerRef.current) return;
    suggestionsContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
    }
  };

  const handleCustomInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    handleInputChange(e);
    adjustTextareaHeight();
  };

  useEffect(() => {
    if (messages.length > 0 && messagesEndRef.current) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  useEffect(() => {
    if (textareaRef.current) {
      if (messages.length === 0) {
        textareaRef.current.rows = 2;
      } else {
        textareaRef.current.rows = 1;
      }
      adjustTextareaHeight();
    }
  }, [messages.length]);

  useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
  }, []);

  useEffect(() => {
    const container = suggestionsContainerRef.current;
    if (container) {
      checkScrollPosition();

      container.addEventListener("scroll", checkScrollPosition);

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, []);

  useEffect(() => {
    setTimeout(checkScrollPosition, 100);

    window.addEventListener("resize", checkScrollPosition);

    return () => {
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  const renderMarkdown = (content: string) => {
    try {
      const parsed = marked.parse(content);

      if (parsed instanceof Promise) {
        return { __html: content };
      }

      // eslint-disable-next-line prettier/prettier
      const html = (parsed as string).replace(
        /<a\s+(?:[^>]*?\s+)?href=([^>]*)>/gi,
        // eslint-disable-next-line quotes
        '<a href=$1 target="_blank" rel="noopener noreferrer">',
      );

      return { __html: html };
    } catch (error) {
      console.error("Error parsing markdown:", error);
      return { __html: content };
    }
  };

  const handleSuggestionClick = (text: string) => {
    if (isLoading) return;

    append({
      role: "user",
      content: text,
    });
  };

  return (
    <PageWrapper noPadding>
      <Container>
        <NextSeo
          title={"Developer, designer & youtuber based in Rouen, France"}
          description={
            "Connect with a skilled developer specializing in TypeScript, React and digital design. Ask questions about projects, experience, and expertise."
          }
        />
        <WebPageJsonLd
          description={"Developer, designer & youtuber based in Rouen, France"}
          id={PERSONAL.url}
        />

        <ChatContainer>
          <MessagesContainer hasMessages={messages.length > 0}>
            {messages.map((m) => (
              <Message key={m.id} $role={m.role}>
                <MessageSender>
                  {m.role === "assistant" && <Avatar src={PERSONAL.image} />}
                  {m.role === "user" ? "You" : "Antoine AI"}
                </MessageSender>
                <MessageContent
                  dangerouslySetInnerHTML={renderMarkdown(m.content)}
                />
              </Message>
            ))}
            {isLoading && (
              <Message $role={"assistant"}>
                <MessageSender>
                  <Avatar src={PERSONAL.image} />
                  {"Antoine AI"}
                </MessageSender>
                <TypingIndicator>{"thinking..."}</TypingIndicator>
              </Message>
            )}
            {error && (
              <Message $role={"assistant"}>
                <MessageSender>
                  <Avatar src={PERSONAL.image} />
                  {"Error"}
                </MessageSender>
                <ErrorMessage>
                  {error.message || "An error occurred. Please try again."}
                </ErrorMessage>
              </Message>
            )}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <form onSubmit={handleSubmit}>
            <ChatInputWrapper isEmpty={messages.length === 0}>
              {messages.length === 0 && (
                <WelcomeHeader>
                  <h1>{"my future is yours, i develop for us."}</h1>
                </WelcomeHeader>
              )}
              <ChatInputContainer>
                <ChatInput
                  ref={textareaRef}
                  value={input}
                  onChange={handleCustomInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={"Ask me anything..."}
                  autoComplete={"off"}
                  isLoading={isLoading}
                  rows={messages.length === 0 ? 2 : 1}
                />
                <ChatToolbar>
                  <AboutLink href={"/what"}>
                    {"Learn more about me "}
                    <ArrowRight size={12} />
                  </AboutLink>
                  <ActionsContainer>
                    <ChatModel>
                      <AvatarSmall src={PERSONAL.image} />
                      {"Antoine AI"}
                    </ChatModel>
                    <SendButton
                      type={"submit"}
                      disabled={!input.trim() || isLoading}
                    >
                      <ArrowUp size={20} />
                    </SendButton>
                  </ActionsContainer>
                </ChatToolbar>
              </ChatInputContainer>
              {messages.length > 0 ? (
                <DisclaimerText>
                  {
                    "Antoine AI is doing its best but may occasionally make mistakes."
                  }
                </DisclaimerText>
              ) : (
                <SuggestionsWrapper
                  showLeftArrow={showLeftArrow}
                  showRightArrow={showRightArrow}
                >
                  {showLeftArrow && (
                    <ScrollArrow
                      onClick={scrollSuggestionsLeft}
                      position={"left"}
                    >
                      <ChevronLeft size={16} />
                    </ScrollArrow>
                  )}

                  <SuggestionsContainer ref={suggestionsContainerRef}>
                    {SUGGESTED_MESSAGES.map((suggestion, index) => (
                      <SuggestionChip
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        disabled={isLoading}
                        type={"button"}
                      >
                        {suggestion}
                      </SuggestionChip>
                    ))}
                  </SuggestionsContainer>

                  {showRightArrow && (
                    <ScrollArrow
                      onClick={scrollSuggestionsRight}
                      position={"right"}
                    >
                      <ChevronRight size={16} />
                    </ScrollArrow>
                  )}
                </SuggestionsWrapper>
              )}
            </ChatInputWrapper>
          </form>
        </ChatContainer>
      </Container>
    </PageWrapper>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: #10100e;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;

  @media (min-width: 851px) {
    margin: 0 auto;
  }
`;

const WelcomeHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 1rem;
    color: #bdbdb2;
  }
`;

const MessagesContainer = styled.div<{ hasMessages: boolean }>`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: calc(2rem + 10px);
  padding-bottom: ${({ hasMessages }) => (hasMessages ? "150px" : "1rem")};

  @media (max-width: 850px) {
    padding-top: calc(65px + 10px);
  }
`;

const Message = styled.div<{ $role: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
`;

const MessageSender = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #ffffe3;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const AvatarSmall = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
`;

const MessageContent = styled.div`
  color: #bdbdb2;
  text-align: left;
  font-size: 1rem;
  line-height: 1.5;

  /* Markdown styles */
  a {
    color: #ffffe3;
    text-decoration: underline;

    &:hover {
      opacity: 0.8;
    }
  }

  p {
    margin: 0.5rem 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  code {
    background-color: #10100e;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: monospace;
    font-size: 0.85em;
  }

  pre {
    background-color: #10100e;
    padding: 0.5rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 0.5rem 0;

    code {
      background-color: transparent;
      padding: 0;
      border-radius: 0;
    }
  }

  /* Markdown list styling */
  ul,
  ol {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  blockquote {
    border-left: 3px solid #30302b;
    margin: 0.5rem 0;
    padding-left: 1rem;
    color: #8e8e83;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.5rem 0;
    color: #ffffe3;
  }

  hr {
    border: none;
    border-top: 1px solid #30302b;
    margin: 0.5rem 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.5rem 0;

    th,
    td {
      border: 1px solid #30302b;
      padding: 0.3rem;
      text-align: left;
    }

    th {
      background-color: #1e1e1a;
    }
  }
`;

const TypingIndicator = styled.div`
  color: #bdbdb2;
  font-style: italic;
  text-align: left;
  font-size: 0.8rem;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  text-align: left;
  font-size: 0.9rem;
  background-color: rgba(255, 107, 107, 0.1);
  padding: 0.5rem;
  border-radius: 4px;
  border-left: 3px solid #ff6b6b;
`;

const SuggestionsWrapper = styled.div<{
  showLeftArrow: boolean;
  showRightArrow: boolean;
}>`
  position: relative;
  width: 100%;
  margin-top: 1rem;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 40px;
    background: linear-gradient(to right, #10100e, rgba(16, 16, 14, 0));
    z-index: 4;
    opacity: ${({ showLeftArrow }) => (showLeftArrow ? "1" : "0")};
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 40px;
    background: linear-gradient(to left, #10100e, rgba(16, 16, 14, 0));
    z-index: 4;
    opacity: ${({ showRightArrow }) => (showRightArrow ? "1" : "0")};
    pointer-events: none;
    transition: opacity 0.2s ease;
  }
`;

const SuggestionsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  & > button {
    margin-right: 0.5rem;
    flex-shrink: 0;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const ScrollArrow = styled.button<{ position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => (position === "left" ? "left: 5px;" : "right: 5px;")}
  z-index: 5;
  background-color: #1e1e1a;
  color: #bdbdb2;
  border: 1px solid #30302b;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background-color: #30302b;
    color: #ffffe3;
  }
`;

const SuggestionChip = styled.button`
  background-color: #1e1e1a;
  color: #bdbdb2;
  border: 1px solid #30302b;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    background-color: #30302b;
    color: #ffffe3;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ChatInputWrapper = styled.div<{ isEmpty?: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: ${({ isEmpty }) => (isEmpty ? "50%" : "0")};
  transform: translateY(${({ isEmpty }) => (isEmpty ? "50%" : "0")});
  transition: all 0.2s ease;
  background-color: #10100e;
  padding-bottom: ${({ isEmpty }) => (isEmpty ? "0" : "8px")};
  box-sizing: border-box;

  @media (min-width: 851px) {
    width: calc(100% - 15rem - 32px);
    max-width: 800px;
    right: auto;

    @media (max-width: 1250px) {
      left: calc(15rem + 16px);
      right: 16px;
      max-width: calc(100% - 15rem - 32px);
    }
  }

  @media (max-width: 850px) {
    width: calc(100% - 32px);
    max-width: 800px;
    left: 16px;
    right: 16px;
    margin: 0 auto;
  }
`;

const ChatInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 14px;
  border-radius: 16px;
  background-color: #1e1e1a;
  border: 1px solid #30302b;
  gap: 0.5rem;
  box-sizing: border-box;
`;

const ChatInput = styled.textarea<{ isLoading: boolean }>`
  flex: 1;
  padding: 0;
  background-color: transparent;
  font-family: inherit;
  color: #ffffe3;
  font-size: 1rem;
  outline: none;
  border: none;
  resize: none;
  overflow: hidden;
  min-height: auto;
  line-height: 1.5;
  ${({ isLoading }) => (isLoading ? "opacity: 0.7;" : "")}

  &::placeholder {
    color: #505050;
  }
`;

const ChatToolbar = styled.div`
  display: flex;
  align-items: center;
`;

const AboutLink = styled(Link)`
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    opacity: 0;
    transition:
      margin-left 0.2s ease,
      opacity 0.1s ease;
  }

  &:hover svg {
    opacity: 1;
    margin-left: 2px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`;

const ChatModel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 12px;
  user-select: none;
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background-color: #ffffe3;
  color: #10100e;
  border: 1px solid #30302b;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:disabled {
    background-color: #30302b;
    color: #505050;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #bdbdb2;
  }
`;

const DisclaimerText = styled.div`
  text-align: center;
  color: #6c6c63;
  font-size: 0.8rem;
  font-style: italic;
  margin-top: 0.5rem;
`;
