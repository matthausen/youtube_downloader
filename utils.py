import re
import pafy
import shutil
import moviepy.editor as mp

def download_and_convert(song_list):
  # Download the file
  for song in song_list:
    url = 'https://www.youtube.com/watch?v=' + song
    pafy.new(url).getbest().download(TMP_FOLDER)

  # Convert file/s to mp3, zip and send to client
  for file in os.listdir(TMP_FOLDER):
    if re.search('mp4', file):
      mp4_path = os.path.join(TMP_FOLDER,file)
      mp3_path = os.path.join(TMP_FOLDER,os.path.splitext(file)[0]+'.mp3')
      new_file = mp.AudioFileClip(mp4_path)
      new_file.write_audiofile(mp3_path)
      os.remove(mp4_path)
      os.walk(TMP_FOLDER)
      shutil.make_archive('Music' + str(time.time()), 'zip', TMP_FOLDER)