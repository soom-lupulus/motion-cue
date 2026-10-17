import { NextRequest, NextResponse } from 'next/server';
import { prisma, isDatabaseConfigured } from '@/lib/prisma';
import { PRESET_MOTION_CUES } from '@/data/presets';
import { MotionCue } from '@/types/cue';

export async function GET(request: NextRequest) {
  try {
    let dbCues: MotionCue[] = [];
    let dbConnected = false;

    if (isDatabaseConfigured && prisma) {
      try {
        const rows = await prisma.motionCue.findMany({
          orderBy: { createdAt: 'desc' },
        });
        dbCues = rows.map((r) => ({
          ...r,
          category: r.category as any,
          aliases: [],
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
        }));
        dbConnected = true;
      } catch (err) {
        console.warn('Prisma DB query failed, falling back to presets:', err);
        dbConnected = false;
      }
    }

    return NextResponse.json({
      success: true,
      databaseConnected: dbConnected,
      presets: PRESET_MOTION_CUES,
      customCues: dbCues,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to fetch cues',
        presets: PRESET_MOTION_CUES,
        customCues: [],
        databaseConnected: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      nameZh,
      aliases = [],
      category,
      summary,
      description,
      visualTraits = [],
      aiPromptEn,
      aiPromptZh,
      remotionSnippet,
      mathFormula,
      previewType = 'custom',
      tags = [],
    } = body;

    if (!name || !nameZh || !summary) {
      return NextResponse.json(
        { success: false, error: '名称与简要描述不能为空' },
        { status: 400 }
      );
    }

    const newCue: MotionCue = {
      id: `cue-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name,
      nameZh,
      aliases,
      category,
      summary,
      description: description || summary,
      visualTraits,
      aiPromptEn: aiPromptEn || '',
      aiPromptZh: aiPromptZh || '',
      remotionSnippet: remotionSnippet || '',
      mathFormula: mathFormula || '',
      previewType,
      tags,
      isPreset: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isDatabaseConfigured && prisma) {
      try {
        const created = await prisma.motionCue.create({
          data: {
            name: newCue.name,
            nameZh: newCue.nameZh,
            category: newCue.category,
            summary: newCue.summary,
            description: newCue.description,
            visualTraits: newCue.visualTraits,
            aiPromptEn: newCue.aiPromptEn,
            aiPromptZh: newCue.aiPromptZh,
            remotionSnippet: newCue.remotionSnippet,
            mathFormula: newCue.mathFormula,
            previewType: newCue.previewType,
            tags: newCue.tags,
            isPreset: false,
          },
        });
        return NextResponse.json({
          success: true,
          persistedToDb: true,
          cue: {
            ...created,
            createdAt: created.createdAt.toISOString(),
            updatedAt: created.updatedAt.toISOString(),
          },
        });
      } catch (dbErr: any) {
        console.warn('Failed to insert into DB, returning local cue:', dbErr);
        return NextResponse.json({
          success: true,
          persistedToDb: false,
          cue: newCue,
          notice: '数据库未连接或写入失败，已以本地模式暂存',
        });
      }
    }

    return NextResponse.json({
      success: true,
      persistedToDb: false,
      cue: newCue,
      notice: '当前未配置 DATABASE_URL，已保存至本地状态',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
