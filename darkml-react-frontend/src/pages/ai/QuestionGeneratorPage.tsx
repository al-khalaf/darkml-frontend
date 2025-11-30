import React from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  Divider,
  Box,
  MenuItem,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PageHeader from "../../components/common/PageHeader";

interface FormValues {
  classId: string;
  chapters: string[];
  difficulty: string;
  templateType: string;
  mcq?: number;
  trueFalse?: number;
  matching?: number;
  shortResponse?: number;
  longResponse?: number;
}

const classesMock = [
  { id: "math8", name: "Math - Grade 8", chapters: ["1", "2", "3", "4"] },
  { id: "bio9", name: "Biology - Grade 9", chapters: ["1", "5", "7"] },
];

const templates = [
  { value: "standard", label: "Standard Template" },
  { value: "mixed", label: "Mixed Template" },
  { value: "custom", label: "Create Your Own" },
];

// ---------------------------------------------------------
// TEMPORARY FRONTEND-ONLY MOCK GENERATOR (NO BACKEND NEEDED)
// ---------------------------------------------------------
const generateQuestions = async (payload: any) => {
  console.log("MOCK API CALL — received payload:", payload);

  await new Promise((res) => setTimeout(res, 800)); // simulate API delay

  return [
    {
      question: "What is photosynthesis?",
      answer: "The process by which plants convert sunlight into energy.",
      topic: "Biology",
      difficulty: payload.difficulty || "Medium",
    },
    {
      question: "Solve 2x + 5 = 15",
      answer: "x = 5",
      topic: "Algebra",
      difficulty: payload.difficulty || "Easy",
    },
    {
      question: "Explain gravitational force.",
      answer: "The force that attracts objects with mass toward each other.",
      topic: "Physics",
      difficulty: payload.difficulty || "Medium",
    },
  ];
};

const QuestionGeneratorPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      classId: "",
      chapters: [],
      difficulty: "",
      templateType: "",
    },
  });

  const [result, setResult] = React.useState([]);
  const [openScheduleModal, setOpenScheduleModal] = React.useState(false);
  const [pendingFormValues, setPendingFormValues] = React.useState<FormValues | null>(null);

  const [quizDate, setQuizDate] = React.useState<string>("");
  const [quizWeight, setQuizWeight] = React.useState<number | "">("");

  const selectedClass = watch("classId");
  const selectedTemplate = watch("templateType");

  // Step 1 — open modal instead of sending to backend
  const handleInitialSubmit = (values: FormValues) => {
    setPendingFormValues(values);
    setOpenScheduleModal(true);
  };

  // Step 2 — once date + weight are added, generate mock questions
  const handleGenerateAfterSchedule = async () => {
    if (!pendingFormValues || !quizDate || quizWeight === "") return;

    const payload = {
      ...pendingFormValues,
      quizDate,
      quizWeight,
    };

    try {
      const res: any = await generateQuestions(payload);
      setResult(res);
      setOpenScheduleModal(false);
    } catch (err) {
      console.error("Mock mode error:", err);
    }
  };

  return (
    <>
      <PageHeader
        title="AI Question Generator"
        subtitle="Generate questions from class content, chapters, difficulty, and templates."
      />

      {/* MAIN FORM CARD */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6">Generation Parameters</Typography>

          <Divider />

          <Box component="form" onSubmit={handleSubmit(handleInitialSubmit)}>
            <Grid container spacing={2.25}>
              {/* CLASS SELECT */}
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Class"
                  {...register("classId")}
                >
                  {classesMock.map((cls) => (
                    <MenuItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* CHAPTER SELECT */}
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Chapters"
                  SelectProps={{ multiple: true }}
                  {...register("chapters")}
                >
                  {selectedClass &&
                    classesMock
                      .find((c) => c.id === selectedClass)
                      ?.chapters.map((ch) => (
                        <MenuItem key={ch} value={ch}>
                          Chapter {ch}
                        </MenuItem>
                      ))}
                </TextField>
              </Grid>

              {/* DIFFICULTY */}
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Difficulty"
                  {...register("difficulty")}
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </TextField>
              </Grid>

              {/* TEMPLATE */}
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Template"
                  {...register("templateType")}
                >
                  {templates.map((t) => (
                    <MenuItem key={t.value} value={t.value}>
                      {t.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* CUSTOM TEMPLATE FIELDS */}
              {selectedTemplate === "custom" && (
                <>
                  <Grid item xs={12} md={2.4}>
                    <TextField label="MCQs" type="number" size="small" fullWidth {...register("mcq")} />
                  </Grid>

                  <Grid item xs={12} md={2.4}>
                    <TextField label="True/False" type="number" size="small" fullWidth {...register("trueFalse")} />
                  </Grid>

                  <Grid item xs={12} md={2.4}>
                    <TextField label="Matching" type="number" size="small" fullWidth {...register("matching")} />
                  </Grid>

                  <Grid item xs={12} md={2.4}>
                    <TextField label="Short Response" type="number" size="small" fullWidth {...register("shortResponse")} />
                  </Grid>

                  <Grid item xs={12} md={2.4}>
                    <TextField label="Long Response" type="number" size="small" fullWidth {...register("longResponse")} />
                  </Grid>
                </>
              )}
            </Grid>

            <Box
              sx={{
                display: "flex",
                mt: 2.5,
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Generate Questions
              </Button>

              <Stack direction="row" spacing={1}>
                <Chip size="small" label="AI assisted" variant="outlined" color="primary" />
                <Chip size="small" label="Export to assessments later" variant="outlined" />
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* ------------------------------------------- */}
      {/* QUIZ SCHEDULING MODAL */}
      {/* ------------------------------------------- */}
      <Dialog open={openScheduleModal} onClose={() => setOpenScheduleModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Schedule Quiz</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField
            label="Quiz Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={quizDate}
            onChange={(e) => setQuizDate(e.target.value)}
            fullWidth
          />

          <TextField
            label="Quiz Weight (%)"
            type="number"
            value={quizWeight}
            onChange={(e) => setQuizWeight(Number(e.target.value))}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenScheduleModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleGenerateAfterSchedule} disabled={!quizDate || quizWeight === ""}>
            Confirm & Generate
          </Button>
        </DialogActions>
      </Dialog>

      {/* ------------------------------------------- */}
      {/* GENERATED QUESTIONS DISPLAY */}
      {/* ------------------------------------------- */}
      {result.length > 0 && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Generated Questions</Typography>
            <Divider sx={{ my: 1 }} />

            {result.map((q, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: "bold" }}>{q.question}</Typography>
                <Typography sx={{ ml: 1 }}>Answer: {q.answer}</Typography>
                <Typography sx={{ ml: 1, fontSize: "0.85rem", opacity: 0.7 }}>
                  Topic: {q.topic} — Difficulty: {q.difficulty}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default QuestionGeneratorPage;
