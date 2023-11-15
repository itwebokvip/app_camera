class SubmitDate {
  private static instance: SubmitDate | null = null;
  private submittedTime: Date | null = null;

  private constructor() {}

  public static getInstance(): SubmitDate {
    if (!SubmitDate.instance) {
      SubmitDate.instance = new SubmitDate();
    }
    return SubmitDate.instance;
  }

  public setSubmittedTime(time: Date): void {
    this.submittedTime = time;
  }

  public getSubmittedTime(): Date | null {
    return this.submittedTime;
  }
}

export default SubmitDate;
